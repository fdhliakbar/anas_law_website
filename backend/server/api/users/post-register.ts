export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Validasi dan simpan ke database di sini
  return { message: "User registered successfully", data: body };
});
