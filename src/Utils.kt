import kotlin.js.dom.html.Window
import org.w3c.dom.Document
import org.w3c.dom.Element
import kotlin.js.dom.html.HTMLElement

native fun Window.requestAnimationFrame(callback: () -> Unit): Unit = noImpl
native val Document.body: HTMLElement get() = noImpl
native var Element.className: String get() = noImpl; set(v) = noImpl

native trait KeyboardEvent
{
    native val keyCode: Int
}

native trait MouseEvent
{
    native val clientX: Number
    native val clientY: Number

    native val screenX: Number
    native val screenY: Number

    native val which: Int
}

native var Window.onkeydown: (KeyboardEvent) -> Unit
    get() = noImpl
    set(value) = noImpl

native var Window.onkeyup: (KeyboardEvent) -> Unit
    get() = noImpl
    set(value) = noImpl

native var Window.onkeypress: (KeyboardEvent) -> Unit
    get() = noImpl
    set(value) = noImpl

native fun alert(message: Any): Unit = noImpl

object KeyCodes
{
    val Space = 32

    val Left = 37
    val Up = 38
    val Right = 39
    val Down = 40

    val W = 87
    val A = 65
    val S = 83
    val D = 68
}
