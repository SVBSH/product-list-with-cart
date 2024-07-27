import DessertItem from "@components/dessertItem/DessertItem";
import useDessertList from "../../hooks/useDessertList";


function DessertList() {
  const [desserts, status] = useDessertList();

  return (
    <ul className="dessert-list">
      {
        status === "loading" ? (
          <div>Loading Desserts...</div>
        ) : (
          <ul className="dessert-list">
            {desserts.map((dessert, index) => (
              <DessertItem key={index} {...dessert} />
            ))}
          </ul>
        )
      }
    </ul>
  )
}

export default DessertList;
