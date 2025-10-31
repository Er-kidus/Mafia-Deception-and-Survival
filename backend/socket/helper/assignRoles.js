export default function assignRoles(room) {
  const totalPlayers = room.players.length;
  const mafiaCount = Math.floor(totalPlayers / 3);

  const indices = [...Array(totalPlayers).keys()].sort(
    () => Math.random() - 0.5
  );

  const mafiaIndices = indices.slice(0, mafiaCount);

  // Assign roles
  room.players = room.players.map((player, index) => ({
    ...player,
    role: mafiaIndices.includes(index) ? "Mafia" : "Civilian",
  }));

  return room;
}
