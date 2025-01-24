// TODO: Define a City class with name and id properties
class City {
  name: string,
  id: number,

  constructor(name:string, id:number){
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const res = await fetch('searchHistory.json');
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const importCities = JSON.stringify(cities);

    await fetch('searchHistory.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: importCities,
    })
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
   async getCities() {
    const cities = await this.read();
    return cities.map((city: any) => new City(city.name, city.id))
   }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const citiesList = await this.read();
    citiesList.push(city)
    await this.write(citiesList);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
