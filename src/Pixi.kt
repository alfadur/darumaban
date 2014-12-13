import kotlin.js.dom.html.Window
import org.w3c.dom.Document
import kotlin.js.dom.html.HTMLElement
import kotlin.js.dom.html5.HTMLCanvasElement

suppress("UNUSED_PARAMETER")
native object PIXI
{
    native class Point(val x: Number, val y: Number)
    native class Rectangle(val x: Number, val y: Number, val width: Number, val height: Number)

    native open class DisplayObject
    {
        var position: Point get() = noImpl; set(v) = noImpl
        var rotation: Double get() = noImpl; set(v) = noImpl
        var pivot: Point get() = noImpl; set(v) = noImpl
        var scale: Point get() = noImpl; set(v) = noImpl

        native var visible: Boolean get() = noImpl; set(v) = noImpl
    }

    native open class DisplayObjectContainer: DisplayObject()
    {
        native fun addChild(child: DisplayObject): DisplayObject = noImpl
        native fun removeChild(child: DisplayObject): DisplayObject = noImpl

        native fun removeChildren(): Unit = noImpl
    }

    native class Stage(color: Number = 0): DisplayObjectContainer()

    native class CanvasRenderer(width: Number = 800, height: Number = 600)
    {
        native val view: HTMLCanvasElement = noImpl
        native fun render(stage: Stage): Unit = noImpl
    }

    native class Graphics: DisplayObject()
    {
        native fun beginFill(color: Number = 0, alpha: Number = 1): Graphics = noImpl
        native fun endFill(): Graphics = noImpl

        native fun lineStyle(lineWidth: Number = 0, color: Number = 0, alpha: Number = 1): Graphics = noImpl

        native fun moveTo(x: Number, y: Number): Graphics = noImpl
        native fun lineTo(x: Number, y: Number): Graphics = noImpl
        native fun drawRect(x: Number, y: Number, width: Number, height: Number): Graphics = noImpl
        native fun drawCircle(x: Number, y: Number, radius: Number): Graphics = noImpl

        native fun clear(): Graphics = noImpl
    }

    native class AssetLoader(assetUrls: Array<String>, crossorigin: Boolean)
    {
        native fun load(): Unit = noImpl
        native var onComplete: () -> Unit = noImpl
    }

    native class BaseTexture private()
    {
        class object
        {
            native fun fromImage(imageUrl: String, crossorigin: Boolean): BaseTexture = noImpl
        }
    }

    native class Texture(baseTexture: BaseTexture, frame: Rectangle)
    {
        class object
        {
            native fun fromFrame(frameId: String): Texture = noImpl
        }
    }

    native class Sprite(texture: Texture): DisplayObject()
    native class SpriteBatch(): DisplayObjectContainer()
}
