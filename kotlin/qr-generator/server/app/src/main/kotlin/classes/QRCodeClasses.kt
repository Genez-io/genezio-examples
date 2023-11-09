package classes

import kotlinx.serialization.Serializable

@Serializable
data class QRCodeId(
    var _id: String,
    var userId: String,
    var name: String,
    var bitmap: ByteArray
)
@Serializable
data class QRCode(
    var userId: String,
    var name: String,
    var bitmap: ByteArray,
)
@Serializable
data class QRCodeResponse(
    var success: Boolean,
    var message: String?,
    var data: ArrayList<QRCodeId>?,

    )

@Serializable
data class Test(
    var qrCodeTest: QRCodeId
)