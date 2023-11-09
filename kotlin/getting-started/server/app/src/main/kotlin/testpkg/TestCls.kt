package testpkg
import kotlinx.serialization.Serializable

@Serializable
class TestCls (
    val test_int : Int,
    val test_str : String,
    val test_bool : Boolean
)