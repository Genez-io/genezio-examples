package classes

import kotlinx.serialization.Serializable

@Serializable
data class User(
    var email: String,
    var password: String,
)
@Serializable
data class UserId(
    var _id: String,
    var email: String,
    var password: String,
)
@Serializable
data class UserResponse(
    var success: Boolean,
    var message: String?,
    var data: ArrayList<UserId>?,

    )