data class Point(val x: Int = 0, val y: Int = 0)
{
    fun plus(d: Direction) = Point(x + d.shift.x, y + d.shift.y)
    fun minus(d: Direction) = Point(x + d.shift.x, y + d.shift.y)

    class object
    {
        val zero = Point()
    }
}

enum class Direction(val shift: Point)
{
    None:  Direction(Point.zero)
    Up:    Direction(Point(0, 1))
    Left:  Direction(Point(-1, 0))
    Down:  Direction(Point(0, -1))
    Right: Direction(Point(1, 0))
}

data class Vector(val x: Double = 0.0, val y: Double = 0.0)
{
    class object
    {
        val zero = Vector()
    }
}