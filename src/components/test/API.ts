class API {
  public api_url: string;
  public constructor() {
    this.api_url = "https://frontend-take-home.fetchrewards.com/form";
  }
  async api_method() {
    const response = await fetch(this.api_url);
    return response.status;
  }
}

export default API;
