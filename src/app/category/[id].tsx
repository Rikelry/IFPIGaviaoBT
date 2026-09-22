// ============================================================================
// Tela de Categoria: Listagem de Itens por Categoria selecionada
// ============================================================================

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "../../view/components/ProductCard";
import { useCategoryViewModel } from "../../viewmodel/useCategoryViewModel";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

export default function CategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { carregando, produtos } = useCategoryViewModel(id);

  // Título amigável da categoria
  const nomeCategoria =
    id === "bebidas" ? "Bebidas" :
    id === "comidas" ? "Comidas" : "Cardápio";

  return (
    <View style={styles.tela}>
      {/* CABEÇALHO ROXO DA CATEGORIA */}
      <View style={styles.cabecalhoContainer}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.cabecalhoLinha}>
            {/* Botão de Retorno < Início */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.botaoVoltar}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#ffffff" />
              <Text style={styles.textoVoltar}>Início</Text>
            </TouchableOpacity>

            {/* Nome Centralizado da Categoria */}
            <Text style={styles.tituloHeader}>{nomeCategoria}</Text>

            {/* Espaçador invisível para balancear o cabeçalho */}
            <View style={styles.espacadorHeader} />
          </View>
        </SafeAreaView>
      </View>

      {/* CONTEÚDO PRINCIPAL: LISTA DE PRODUTOS */}
      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#501673" />
          <Text style={styles.loadingTexto}>Buscando itens no banco...</Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.vazioContainer}>
              <Text style={styles.vazioTexto}>
                Nenhum item encontrado nesta categoria.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard
              produto={item}
              onPress={() => router.push(`/item/${item.id}`)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  cabecalhoContainer: {
    backgroundColor: "#501673",
    paddingBottom: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  cabecalhoLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingRight: 8,
  },
  textoVoltar: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 2,
  },
  tituloHeader: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  espacadorHeader: {
    width: 60,
  },
  listaConteudo: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingTexto: {
    marginTop: 12,
    fontSize: 15,
    color: "#6c757d",
  },
  vazioContainer: {
    paddingTop: 60,
    alignItems: "center",
  },
  vazioTexto: {
    fontSize: 15,
    color: "#8c959f",
  },
});
