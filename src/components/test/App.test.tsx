import API from "./API";
//  200 || 201 is the expected response from the API
test("API testing", async () => {
  const response = new API();
  console.log(await response.api_method());
  expect(await response.api_method()).toBe(200 || 201);
});
