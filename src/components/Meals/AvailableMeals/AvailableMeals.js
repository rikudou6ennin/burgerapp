import { useEffect, useState } from "react"
import Card from "../../UI/Card/Card"
import MealItem from "../MealItem/MealItem"
import classes from "./AvailableMeals.module.css"

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://learn-react-http-c8969-default-rtdb.firebaseio.com/meals.json"
      )

      if (!response.ok) {
        throw new Error("Could not find meals")
      }

      const responseData = await response.json()

      let loadedMeals = []

      for (let key in responseData) {
        loadedMeals.push({
          id: key,
          ...responseData[key],
        })
      }

      setMealsData(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch((err) => {
      console.log(err)
      setIsLoading(false)
      setHttpError(err.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.mealsLoading}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = mealsData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      description={meal.description}
      name={meal.name}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
