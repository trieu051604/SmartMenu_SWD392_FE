import api from "../axios";

export const getPlaylists = async () => {
  const res = await api.get("/playlists");
  return res.data;
};

export const createPlaylist = async (data) => {
  const res = await api.post("/playlists", data);
  return res.data;
};

export const updatePlaylist = async (id, data) => {
  const res = await api.put(`/playlists/${id}`, data);
  return res.data;
};

export const deletePlaylist = async (id) => {
  await api.delete(`/playlists/${id}`);
};
