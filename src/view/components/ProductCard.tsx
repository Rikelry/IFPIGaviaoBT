import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Product } from "../../model/entities/Product";

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
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPress}
    >
      <Image
        source={produto.imagem}
        style={styles.imagem}
        resizeMode="cover"
      />

      <View style={styles.conteudo}>
        <View style={styles.linhaTitulo}>
          <Text style={styles.nome} numberOfLines={2}>
            {produto.nome}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#501673"
          />
        </View>

        <Text style={styles.descricao} numberOfLines={2}>
          {produto.descricao}
        </Text>

        <Text style={styles.preco}>
          {formatarPreco(produto.preco)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginBottom: 14,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  imagem: {
    width: 110,
    height: 130,
  },

  conteudo: {
    flex: 1,
    padding: 14,
  },

  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  nome: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#2d1438",
  },

  descricao: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: "#666666",
  },

  preco: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#501673",
  },
});