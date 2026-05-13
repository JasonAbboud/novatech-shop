import { createContext, useContext, useMemo, useState } from "react";

const USERS = [
  {
    nom: "admin",
    mdp: "1234",
    admin: true,
    adresse: "100 rue Admin, Montréal",
    langue: "fr",
  },
  {
    nom: "client",
    mdp: "1234",
    admin: false,
    adresse: "200 rue Client, Blainville",
    langue: "fr",
  },
  {
    nom: "loic",
    mdp: "loic123",
    admin: false,
    adresse: "Blainville, Québec",
    langue: "fr",
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (nom, mdp) => {
    const foundUser = USERS.find(
      (u) =>
        u.nom.trim().toLowerCase() === nom.trim().toLowerCase() &&
        u.mdp === mdp
    );

    if (!foundUser) {
      return { success: false, message: "Nom d'utilisateur ou mot de passe invalide." };
    }

    setUser(foundUser);
    return { success: true, user: foundUser };
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return value;
}