const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obteniendo un 200", async () => {
    const response = await request(server).get("/cafes").send();

    const status = response.statusCode;
    const body = response.body;

    const cafes = body;

    expect(cafes).toBeInstanceOf(Array);
    expect(status).toBe(200);
  });

  it("Intento de eliminar un producto", async () => {
    const idDeProductoAEliminar = 999;

    const response = await request(server)
      .delete(`/cafes/${idDeProductoAEliminar}`)
      .send();

    expect(response.status).toBe(400);
  });

  it("Enviando un nuevo café", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: "café de chocolate cookies" };
  
    const response = await request(server)
      .post("/cafes")
      .send(cafe);
  
   
    expect(response.status).toBe(201);
  
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toContainEqual(cafe);
  });

  it("Intento de modificar un café con un ID diferente al del payload devuelve un status code 400", async () => {
    const idEnParametros = 999;
    const idEnPayload = 123; 
    const cafe = { id: idEnPayload, nombre: "café de chocolate cookies" };
  
    const response = await request(server)
      .put(`/cafes/${idEnParametros}`)
      .send(cafe);
  

    expect(response.status).toBe(400);
  

    expect(response.body).toEqual({
      message: "El id del parámetro no coincide con el id del café recibido",
    });
  });
  
  
});


  