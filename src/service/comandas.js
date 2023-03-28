export const COMANDA_KEY = ["comandas"];

export async function getComandas() {
  try {
    const data = await fetch(`/api/comandas`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
    return result;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export const postComanda = async (data = {}) => {
  try {
    const result = await fetch(`/api/comandas`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteComandas = async (data = {}) => {
  try {
    const result = await fetch(`/api/comandas`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

export const putComanda = async (data = {}) => {
  try {
    const result = await fetch(`/api/comandas/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteComanda = async (data = {}) => {
  try {
    const result = await fetch(`/api/comandas/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};
