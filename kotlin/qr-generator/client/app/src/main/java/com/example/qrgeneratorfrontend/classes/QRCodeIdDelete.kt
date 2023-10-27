package com.example.qrgeneratorfrontend.classes



data class QRCodeIdDelete(
    var _id: String,
    var userId: String,
    var name: String,
    var bitmap: ByteArray,
    var isDeleting: Boolean
)