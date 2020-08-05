let users = [
  {
    id: "1",
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: "2",
    name: "John Doe",
    bio: "Not Tarzan's Wife, another John",
  },
  {
    id: "3",
    name: "Jack Doe",
    bio: "Not Tarzan's Wife, another Jack",
  },
];

function getUsers() {
  return users;
}

function createUser(data) {
  const payload = {
    id: String(users.length + 1),
    ...data,
  };

  users.push(payload);
  return payload;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
}

function updateUser(id, data) {
  const index = users.findIndex((user) => user.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };
  return users[index];
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
