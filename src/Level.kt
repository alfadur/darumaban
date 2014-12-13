class Character(var currentTile: Point = Point.zero)
{
    var targetTile = currentTile

    var shift = 0.0

    var direction = Direction.None
    var moveDirection = Direction.None
    var isRolling = false

    val rollSources = arrayOfNulls<Point>(4)
    var rollSourcesUpdated = false

    fun stop()
    {
        targetTile = currentTile
        shift = 0.0
        moveDirection = Direction.None
    }

    class object
    {
        val moveDirections =
            Direction.values().filter{ it != Direction.None }.toArrayList()
    }
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

    fun reduce()
    {
        if (partsCount > 1)
        {
            partSizes[partsCount - 1] = 0
        }
        else
        {
            --partSizes[0]
        }
    }

    fun stop()
    {
        targetTile = currentTile
        shift = 0.0
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

    fun reset()
    {
        snow.indices.forEach { snow[it] = 0 }
        snowChanged = true

        snowmen.clear()
        snowmenChanged = true

        characters.clear()
    }

    fun isPassable(tileX: Int, tileY: Int) =
        tileX in 0..width - 1 &&
        tileY in 0..height - 1 &&
        grid[tileY * width + tileX] <= 0

    fun isPassable(tile: Point) = isPassable(tile.x, tile.y)

    fun hasSomething(tileX: Int, tileY: Int) =
        characters.any{ it.targetTile.x == tileX && it.targetTile.y == tileY} ||
        snowmen.any{ it.targetTile.x == tileX && it.targetTile.y == tileY}

    fun hasSomething(tile: Point) = hasSomething(tile.x, tile.y)

    fun hasSnow(tileX: Int, tileY: Int) =
        isPassable(tileX, tileY) && snow[width * tileY + tileX] >= 0

    fun hasSnow(tile: Point) = hasSnow(tile.x, tile.y)

    fun addSnow(tileX: Int, tileY: Int)
    {
        if (isPassable(tileX, tileY))
        {
            snow[width * tileY + tileX] = 0
            snowChanged = true
        }
    }

    fun addSnow(tile: Point) = addSnow(tile.x, tile.y)

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

    fun createCharacter(tile: Point): Character =
        with(Character(tile))
        {
            findRolls()
            characters.add(this)
            this
        }

    fun createSnowman(tile: Point): Snowman =
        with(Snowman(tile))
        {
            partSizes[0] = 1
            snowmen.add(this)
            snowChanged = true
            this
        }

    fun findSnowman(tile: Point): Snowman? =
        snowmen.firstOrNull{ it.currentTile == tile }

    fun Character.findRolls()
    {
        for (i in Character.moveDirections.indices)
        {
            val direction = Character.moveDirections[i]

            val target = currentTile + direction
            val existingSnowman = findSnowman(target)

            val snowmanTarget = target + direction
            val targetSnowman = findSnowman(snowmanTarget)

            val rollSourceTile = when
            {
                existingSnowman != null && targetSnowman != null &&
                    existingSnowman.isRollable ->
                {
                    val size = existingSnowman.partSizes[0] +
                        if (hasSnow(target)) 1 else 0

                    when
                    {
                        targetSnowman.hasPlaceFor(size) -> target
                        hasSnow(currentTile) && existingSnowman.hasPlaceFor(1) -> currentTile
                        else -> null
                    }
                }

                existingSnowman != null && existingSnowman.isRollable &&
                    canMoveTo(snowmanTarget) ->
                {
                    target
                }

                hasSnow(currentTile) && (canMoveTo(target) ||
                        existingSnowman != null && existingSnowman.hasPlaceFor(1)) ->
                {
                    currentTile
                }

                else -> null
            }

            rollSources[i] = rollSourceTile
        }
        rollSourcesUpdated = true
    }

    fun Character.update()
    {
        if (currentTile != targetTile)
        {
            shift += 0.08
            if (shift >= 1.0)
            {
                currentTile = targetTile
                shift -= 1.0
                findRolls()
            }
        }
        else if (direction != Direction.None)
        {
            val target = currentTile + direction

            if (isRolling)
            {
                val rollSource = rollSources[direction.ordinal() - 1]

                if (rollSource == currentTile)
                {
                    removeSnow(currentTile)
                    createSnowman(currentTile).targetTile = target

                    snowChanged = true
                    snowmenChanged = true

                    findRolls()
                }
                else if (rollSource == target)
                {
                    val snowman = findSnowman(target)!!
                    if (snowman.partSizes[0] < Snowman.MaxSize && hasSnow(target))
                    {
                        ++snowman.partSizes[0]
                        removeSnow(target)

                        snowChanged = true
                        snowmenChanged = true
                    }
                    snowman.targetTile = target + direction
                }
            }

            if (canMoveTo(target))
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
            characters.forEach { it.findRolls() }
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
