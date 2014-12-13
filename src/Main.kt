
import kotlin.js.dom.html.window
import kotlin.js.dom.html.Window
import kotlin.js.dom.html5.HTMLCanvasElement
import kotlin.browser.document
import org.w3c.dom.Document
import kotlin.js.dom.html.HTMLElement
import java.util.ArrayList
import java.util.HashMap



val levelGrid =
    run {
        val X = 1
        val o = 0
        val _ = -1

        intArray(
            o, o, o, _, o, o, o, o, o, _, o, o,
            o, o, o, X, o, o, o, o, X, X, o, o,
            o, _, X, X, _, o, o, o, o, X, o, X,
            o, o, o, o, X, o, o, o, o, X, o, o,
            o, o, o, o, X, X, X, o, _, o, o, _,
            o, o, o, o, o, _, X, o, o, o, o, X,
            o, X, X, X, o, o, o, o, X, o, o, X,
            o, X, _, X, o, o, o, o, X, X, o, o,
            _, X, o, o, o, o, o, o, _, o, o, o,
            o, o, o, o, o, o, o, X, o, o, o, o,
            o, o, _, X, _, o, o, X, o, o, _, X,
            o, X, X, X, o, o, _, o, o, o, X, X)
    }

val spawnPoints = listOf(
    Point(0, 0),
    Point(9, 9),
    Point(9, 0),
    Point(0, 9)
)

class Game(val controllers: List<Controller>)
{

    val levelSize = 12
    val tileSize: Int = 40

    val screenWidth = (levelSize + 2)* tileSize
    val screenHeight = (levelSize + 2)* tileSize

    val level = Level(levelSize, levelSize, levelGrid)

    val renderer = PIXI.CanvasRenderer(screenWidth, screenHeight)
    val stage = PIXI.Stage(0x000088)
    val snow = PIXI.SpriteBatch()
    val background = PIXI.SpriteBatch()
    val goals = PIXI.Graphics()

    val characters = PIXI.DisplayObjectContainer()
    val charSprites = ArrayList<PIXI.DisplayObject>()
    val snowmen = PIXI.DisplayObjectContainer()
    val snowmanSprites = ArrayList<PIXI.DisplayObject>()

    val texture = PIXI.BaseTexture.fromImage("images/tiles.png", false)
    val tiles = arrayListOf<PIXI.Texture>()

    val hints = PIXI.SpriteBatch()

    ;{
        for (i in 0..6)
        {
            val x = (i mod 2) * tileSize
            val y = (i div 2) * tileSize
            val texture = PIXI.Texture(texture, PIXI.Rectangle(x, y, tileSize, tileSize))
            tiles.add(texture)
        }

        document.getElementById("game").appendChild(renderer.view)

        with (background)
        {
            val wall = tiles[0]
            val floor = tiles[1]

            for (x in 0..levelSize + 1)
            {
                addChild(createSprite(x, 0, wall))
                addChild(createSprite(x, levelSize + 1, wall))
            }

            for (y in 1..levelSize)
            {
                addChild(createSprite(0, y, wall))
                addChild(createSprite(levelSize + 1, y, wall))
            }

            for (i in levelGrid.indices)
            {
                val tile = if (levelGrid[i] > 0) wall else floor
                addChild(createSprite(i, tile))
            }

            stage.addChild(this)
        }


        stage.addChild(snow)
        stage.addChild(goals)
        updateGoals()
        stage.addChild(snowmen)
        stage.addChild(characters)

        restart()

        stage.addChild(hints)

        window.requestAnimationFrame { update() }
    }

    private fun restart()
    {
        level.reset()

        characters.removeChildren()
        charSprites.clear()

        for (i in controllers.indices)
        {
            level.createCharacter(spawnPoints[i])
            addCharSprite()
        }
    }

    private fun createSprite(x: Int, y: Int, texture: PIXI.Texture): PIXI.Sprite
    {
        val sprite = PIXI.Sprite(texture)
        sprite.position = PIXI.Point(x * tileSize, y * tileSize)
        return sprite
    }

    private fun createSprite(tileIndex: Int, texture: PIXI.Texture): PIXI.Sprite
    {
        val x = (tileIndex mod levelSize) + 1
        val y = (tileIndex div levelSize) + 1
        return createSprite(x, y, texture)
    }

    private fun updateGoals()
    {
        with(goals)
        {
            for (i in level.grid.indices)
            {
                if (level.grid[i] < 0)
                {
                    val x = (i mod levelSize) + 1
                    val y = (i div levelSize) + 1

                    lineStyle(3, 0xB53300, 0.7)
                    drawRect(x * tileSize, y * tileSize, tileSize, tileSize)
                }
            }
        }
    }

    private fun updateSnow()
    {
        with(snow)
        {
            removeChildren()

            for (i in level.snow.indices)
            {
                if (level.grid[i] <= 0 && level.snow[i] >= 0)
                {
                    val x = (i mod levelSize) + 1
                    val y = (i div levelSize) + 1

                    val sprite = PIXI.Sprite(tiles[2])
                    sprite.position = PIXI.Point(x * tileSize, y * tileSize)
                    addChild(sprite)
                }
            }
        }
    }

    private fun addSnowSprite(snowman: Snowman)
    {
        if (snowman.isComplete)
        {
            val sprite = createSprite(0, 0, tiles[4])
            snowmanSprites.add(sprite)
            snowmen.addChild(sprite)
        }
        else
        {
            var sprites = PIXI.SpriteBatch()
            for (i in 0..snowman.partsCount - 1)
            {
                val size = snowman.partSizes[i]
                val scale = (size + 1).toDouble() / (Snowman.MaxSize + 1).toDouble()

                val sprite = createSprite(0, 0, tiles[3])

                sprite.position = PIXI.Point(
                    (tileSize div 2) * (1.0 - scale),
                    (tileSize div 2) * (1.0 - scale) - i * (tileSize div 6))

                sprite.scale = PIXI.Point(scale, scale)
                sprites.addChild(sprite)
            }

            snowmanSprites.add(sprites)
            snowmen.addChild(sprites)
        }
    }

    private fun addCharSprite()
    {
        val sprite = createSprite(0, 0, tiles[5])
        sprite.pivot = PIXI.Point(tileSize div 2, tileSize div 2)

        charSprites.add(sprite)
        characters.addChild(sprite)
    }

    fun lerpTile(x1: Int, x2: Int, a: Double) =
        (1.0 - a) * (x1 * tileSize) + a * (x2 * tileSize)

    fun checkWin(): Boolean
    {
        var win = true

        for (i in level.grid.indices)
        {
            if (level.grid[i] < 0)
            {
                val tile = Point(i mod levelSize, i div levelSize)
                val snowman = level.findSnowman(tile)
                if (snowman == null || !snowman.isComplete)
                {
                    win = false
                }
            }
        }

        return win
    }

    fun checkAction(action: ControllerAction) = controllers.any { it.isActive(action) }

    fun update()
    {
        if (checkAction(ControllerAction.Restart))
        {
            restart()
        }

        if (level.snowChanged)
        {
            updateSnow()
            level.snowChanged = false
        }

        if (level.snowmenChanged)
        {
            snowmanSprites.clear()
            snowmen.removeChildren()

            level.snowmen.forEach { addSnowSprite(it) }
            level.snowmenChanged = false

            checkWin()
        }

        for ((char, controller) in level.characters.zip(controllers))
        {
            with (char)
            {
                direction = when
                {
                    controller.isActive(ControllerAction.Up) -> Direction.Up
                    controller.isActive(ControllerAction.Left) -> Direction.Left
                    controller.isActive(ControllerAction.Down) -> Direction.Down
                    controller.isActive(ControllerAction.Right) -> Direction.Right
                    else -> Direction.None
                }
                isRolling = controller.isActive(ControllerAction.Roll)
            }

            if (controller.isActive(ControllerAction.Hint))
            {
                if (!hints.visible || char.rollSourcesUpdated)
                {
                    hints.removeChildren()
                    hints.visible = true

                    for (i in Character.moveDirections.indices)
                    {
                        val start = char.rollSources[i]
                        if (start != null)
                        {
                            val end = start + Character.moveDirections[i]

                            val x = lerpTile(start.x + 1, end.x + 1, 0.5)
                            val y = lerpTile(start.y + 1, end.y + 1, 0.5)

                            val sprite = PIXI.Sprite(tiles[6])
                            val shift = if (i > 0) tileSize div 2 else 0

                            sprite.position = PIXI.Point(x + shift, y + shift)

                            sprite.pivot = PIXI.Point(tileSize div 2, tileSize div 2)
                            sprite.rotation = i * Math.PI / 2
                            hints.addChild(sprite)
                        }
                    }
                    char.rollSourcesUpdated = false
                }
            }
            else
            {
                hints.visible = false
            }
        }

        level.update()

        for ((c, sprite) in level.characters.zip(charSprites))
        {
            val x = lerpTile(c.currentTile.x, c.targetTile.x, c.shift)
            val y = lerpTile(c.currentTile.y, c.targetTile.y, c.shift)
            sprite.position = PIXI.Point(
                x + tileSize + (tileSize div 2),
                y + tileSize + (tileSize div 2))

            sprite.rotation = when (c.moveDirection)
            {
                Direction.Down -> Math.PI
                Direction.Right -> - Math.PI / 2
                Direction.Up -> 0.0
                Direction.Left -> Math.PI / 2
                else -> sprite.rotation
            }

        }

        for ((s, sprite) in level.snowmen.zip(snowmanSprites).sortBy { -it.first.partsCount })
        {
            val x = lerpTile(s.currentTile.x, s.targetTile.x, s.shift)
            val y = lerpTile(s.currentTile.y, s.targetTile.y, s.shift)

            sprite.position = PIXI.Point(
                x + tileSize,
                y + tileSize)
        }

        renderer.render(stage)
        window.requestAnimationFrame { update() }
    }
}

enum class ControllerAction
{
    Up
    Left
    Right
    Down

    Throw
    Roll

    Restart
    Hint
}

trait Controller
{
    fun isActive(action: ControllerAction): Boolean
}

object RandomController: Controller
{
    override fun isActive(action: ControllerAction) =
        Math.random() >= 0.5
}

class KeyboardController(window: Window): Controller
{
    private val holdActionKeys = mapOf(
        ControllerAction.Roll to intArray(KeyCodes.Space, KeyCodes.Shift),
        ControllerAction.Hint to intArray(KeyCodes.Backspace, KeyCodes.Enter))

    private val mixedActionKeys = mapOf(
        ControllerAction.Up to intArray(KeyCodes.Down, KeyCodes.S),
        ControllerAction.Left to intArray(KeyCodes.Left, KeyCodes.A),
        ControllerAction.Down to intArray(KeyCodes.Up, KeyCodes.W),
        ControllerAction.Right to intArray(KeyCodes.Right, KeyCodes.D))


    private val pressActionKeys = mapOf(
        ControllerAction.Restart to intArray(KeyCodes.Escape))

    private val isDown = hashSetOf<Int>()
    private val wasPressed = hashSetOf<Int>()
    private var continuousMode = true

    ;{
        val isDown = isDown
        window.onkeydown =
        {
            isDown.add(it.keyCode)
            wasPressed.add(it.keyCode)

            if (it.keyCode == KeyCodes.P)
            {
                continuousMode = !continuousMode
                wasPressed.clear()
            }
        }

        window.onkeyup =
        {
            isDown.remove(it.keyCode)
        }
    }

    private fun checkHold(keys: IntArray?) =
        keys?.any{ isDown.contains(it)  } ?: false

    private fun retrieveFirst(keys: IntArray?): Boolean
    {
        for (key in keys ?: intArray())
        {
            if (wasPressed.remove(key))
            {
                return true
            }
        }
        return false
    }

    override fun isActive(action: ControllerAction): Boolean =
        checkHold(holdActionKeys[action]) || retrieveFirst(pressActionKeys[action]) ||
            if (continuousMode)
                checkHold(mixedActionKeys[action])
            else
                retrieveFirst(mixedActionKeys[action])

}

fun main(args: Array<String>)
{
    window.onload =
    {
        Game(listOf(KeyboardController(window)/*,
                    RandomController,
                    RandomController,
                    RandomController*/))
    }
}