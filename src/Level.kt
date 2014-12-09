class Character(var currentTile: Point = Point.zero)
{
    var targetTile = currentTile

    var shift = 0.0

    var direction = Direction.None
    var moveDirection = Direction.None
    var isRolling = false
}

class Snowman(var currentTile: Point = Point.zero)
{
    var targetTile = currentTile

    var shift = 0.0

    val partSizes = IntArray(MaxParts)

    val partsCount: Int get() = partSizes.count { it > 0 }
    val isRollable: Boolean get() = partsCount <= 1
    val isComplete: Boolean get() = partsCount >= MaxParts

    fun hasPlaceFor(snowBallSize: Int) =
        partsCount < MaxParts && partSizes[partsCount - 1] > snowBallSize

    fun append(size: Int)
    {
        if (partsCount < MaxParts)
        {
            partSizes[partsCount] = size
        }
    }

    class object
    {
        val MaxSize = 3
        val MaxParts = 3
    }
}

class Level(val width: Int, val height: Int,
            val grid: IntArray = IntArray(width * height))
{
    val snow = IntArray(grid.size)
    val characters = arrayListOf<Character>()
    val snowmen = arrayListOf<Snowman>()

    var snowmenChanged = false
    var snowChanged = false

    fun isPassable(tileX: Int, tileY: Int) =
        tileX >= 0 && tileX < width &&
        tileY >= 0 && tileY < height &&
        grid[tileY * width + tileX] <= 0

    fun isPassable(tile: Point) = isPassable(tile.x, tile.y)

    fun hasSomething(tileX: Int, tileY: Int) =
        characters.any{ it.targetTile.x == tileX && it.targetTile.y == tileY} ||
        snowmen.any{ it.targetTile.x == tileX && it.targetTile.y == tileY}

    fun hasSomething(tile: Point) = hasSomething(tile.x, tile.y)

    fun hasSnow(tileX: Int, tileY: Int) =
        isPassable(tileX, tileY) && snow[width * tileY + tileX] >= 0

    fun hasSnow(tile: Point) = hasSnow(tile.x, tile.y)

    fun removeSnow(tileX: Int, tileY: Int)
    {
        if (isPassable(tileX, tileY))
        {
            snow[width * tileY + tileX] = -1
            snowChanged = true
        }
    }

    fun removeSnow(tile: Point) = removeSnow(tile.x, tile.y)

    fun canMoveTo(tile: Point) = isPassable(tile) && !hasSomething(tile)

    fun createSnowman(tile: Point): Snowman=
        with(Snowman(tile))
        {
            partSizes[0] = 1
            snowmen.add(this)
            snowChanged = true
            this
        }

    fun findSnowman(tile: Point): Snowman? =
        snowmen.firstOrNull{ it.currentTile == tile }

    fun Character.update()
    {
        if (currentTile != targetTile)
        {
            shift += 0.08
            if (shift >= 1.0)
            {
                currentTile = targetTile
                shift -= 1.0
            }
        }
        else if (direction != Direction.None)
        {
            val target = currentTile + direction
            val snowmanTarget = target + direction

            if (isRolling)
            {
                val existingSnowman = findSnowman(target)
                val targetSnowman = findSnowman(snowmanTarget)

                val existingSize =
                    if (existingSnowman != null)
                        existingSnowman.partSizes[0]
                    else 0

                val newSize = existingSize + (if (hasSnow(target)) 1 else 0)

                val canRoll =
                    targetSnowman != null && targetSnowman.hasPlaceFor(existingSize) ||
                        canMoveTo(snowmanTarget)

                val removeSnow =
                    targetSnowman == null || targetSnowman.hasPlaceFor(newSize)

                if (existingSnowman == null)
                {
                    if (canMoveTo(target))
                    {
                        if (hasSnow(currentTile))
                        {
                            createSnowman(currentTile).targetTile = target
                            snowmenChanged = true
                            removeSnow(currentTile)
                        }
                        else
                        {
                            targetTile = target
                        }
                    }
                }
                else if (canRoll && existingSnowman.isRollable)
                {
                    existingSnowman.targetTile = snowmanTarget
                    if (hasSnow(target)&& removeSnow && existingSnowman.partSizes[0] < Snowman.MaxSize)
                    {
                        ++existingSnowman.partSizes[0]
                        snowmenChanged = true
                        removeSnow(target)
                    }
                    targetTile = target
                }
                else if (hasSnow(currentTile) && existingSnowman.hasPlaceFor(0))
                {
                    createSnowman(currentTile).targetTile = target
                    snowmenChanged = true
                    removeSnow(currentTile)
                }
            }
            else if (canMoveTo(target))
            {
                targetTile = target
            }

            moveDirection = direction
        }
    }

    fun Snowman.update()
    {
        if (currentTile != targetTile)
        {
            shift += 0.125
            if (shift >= 1.0)
            {
                val targetSnowman = findSnowman(targetTile)
                if (targetSnowman != null)
                {
                    targetSnowman.append(partSizes[0])
                    remove()
                }
                else
                {
                    currentTile = targetTile
                    shift = 0.0
                }
            }
        }
    }

    fun Snowman.remove()
    {
        val index = snowmen.indexOf(this)
        if (index >= 0)
        {
            snowmen.remove(this)
            snowmenChanged = true
        }
    }

    fun update()
    {
        snowmen.forEach{ it.update() }
        characters.forEach{ it.update() }
    }
}
