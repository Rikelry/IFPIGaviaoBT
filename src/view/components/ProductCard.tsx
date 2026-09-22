import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../model/entities/Product";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ProductCardProps = {
  produto: Product;
  onPress: () => void;
};

export function ProductCard({
  produto,
  onPress,
}: ProductCardProps) {
  function formatarPreco(valor: number): string {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.cardItem}
      onPress={onPress}
    >
      <Image
        source={produto.imagem}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.nomeItem}>{produto.nome}</Text>

        <Text style={styles.precoItem}>
          {formatarPreco(produto.preco)}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#b0b5be"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  thumbnail: {
    width: 80,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },

  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },

  nomeItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 6,
  },

  precoItem: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },
});
