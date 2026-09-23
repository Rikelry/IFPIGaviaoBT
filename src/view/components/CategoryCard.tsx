import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Category } from "../../model/entities/Category";

type CategoryCardProps = {
  categoria: Category;
  onPress: () => void;
};

export function CategoryCard({
  categoria,
  onPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={[styles.cardCategoria, { borderColor: categoria.corBorda }]}
      onPress={onPress}
    >
      <Image
        source={categoria.imagem}
        style={styles.imagemCategoria}
        resizeMode="cover"
      />

      <View style={styles.rodapeCard}>
        <Text style={styles.nomeCategoria}>{categoria.nome}</Text>

        <Ionicons
          name="arrow-forward"
          size={20}
          color={categoria.corSeta}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardCategoria: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  imagemCategoria: {
    width: "100%",
    height: 210,
  },

  rodapeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },

  nomeCategoria: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
});