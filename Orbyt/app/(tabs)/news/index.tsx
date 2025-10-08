import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import React, { useEffect, useState } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import { ThemedText } from "@/components/util/themed-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "@/config/env";

export default function NewsScreen() {
  const [user, setUser] = useState<{ name: string; doc: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const borderColorItem = useOrbytColor('borderItem');
  const backgroundItem = useOrbytColor('backgroundItem');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('acces_taken');
        if (!token) throw new Error('Usuário não logado');

        const response = await fetch(`${env.BASE_URL}/user/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Falha ao buscar dados do usuário');

        const data = await response.json();
        setUser(data);
      } catch (err: unknown) {
        console.error('Erro ao buscar usuário:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); 

  if (loading) return null;

  if (!user) return <ThemedText type="title">Usuário não encontrado</ThemedText>;

  return (
    <ParallaxScrollView>
      <ThemedText type="title">Hello, {user.name}!</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 300
  },
});
