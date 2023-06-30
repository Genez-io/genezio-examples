package geneziokotlin

import kotlinx.serialization.Serializable

// This is a sample data class
// Notice the @Serializable decorator
@Serializable
data class Person(
    val name: String,
    val age: Int,
)

// This is a sample service class
// Declare your methods here
class HelloWorldService {
    fun helloWorld(): String {
        return "Hello World!"
    }

    fun helloWorldWithParam(name: String): String {
        return "Hello $name!"
    }

    fun helloWorldWithObject(person: Person): String {
        return "Hello ${person.name}!"
    }

    fun comparePersonAge(person1: Person, person2: Person): String {
        return if (person1.age > person2.age) {
            "${person1.name} is older than ${person2.name}"
        } else {
            "${person2.name} is older than ${person1.name}"
        }
    }
}
