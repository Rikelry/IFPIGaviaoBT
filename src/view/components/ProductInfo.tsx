import { StyleSheet, Text, View } from "react-native";

type ProductInfoProps = {
    nome: string;
    preco: number;
    categoriaNome: string;
    descricao: string;
    proteinas: string;
    carboidratos: string;
    gorduras: string;
};

export function ProductInfo({
    nome,
    preco,
    categoriaNome,
    descricao,
    proteinas,
    carboidratos,
    gorduras,
}: ProductInfoProps) {
    function formatarPreco(valor: number): string {
        return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    }

    return (
        <View style={styles.infoSecao}>
            {/* Título do Produto e Badge de Preço */}
            <View style={styles.tituloPrecoLinha}>
                <Text style={styles.nomeProduto}>{nome}</Text>

                <View style={styles.badgePreco}>
                    <Text style={styles.textoBadgePreco}>
                        {formatarPreco(preco)}
                    </Text>
                </View>
            </View>

            {/* Tag da Categoria */}
            <View style={styles.categoriaTag}>
                <Text style={styles.textoCategoriaTag}>
                    {categoriaNome || "Lanche"}
                </Text>
            </View>

            {/* Descrição do Produto */}
            <Text style={styles.descricaoTexto}>{descricao}</Text>

            {/* Informações Nutricionais */}
            <View style={styles.nutricaoLinha}>
                <Text style={styles.nutricaoItem}>
                    Proteínas:{" "}
                    <Text style={styles.nutricaoValor}>{proteinas}</Text>
                </Text>

                <Text style={styles.nutricaoItem}>
                    Carboidratos:{" "}
                    <Text style={styles.nutricaoValor}>{carboidratos}</Text>
                </Text>

                <Text style={styles.nutricaoItem}>
                    Gorduras:{" "}
                    <Text style={styles.nutricaoValor}>{gorduras}</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoSecao: {
        paddingHorizontal: 20,
        paddingTop: 18,
    },

    tituloPrecoLinha: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
    },

    nomeProduto: {
        flex: 1,
        fontSize: 24,
        fontWeight: "bold",
        color: "#1a1a1a",
        lineHeight: 30,
    },

    badgePreco: {
        backgroundColor: "#248232",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    textoBadgePreco: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },

    categoriaTag: {
        alignSelf: "flex-end",
        marginTop: 6,
        backgroundColor: "#f1f3f5",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e2e6ea",
    },

    textoCategoriaTag: {
        fontSize: 12,
        color: "#495057",
        fontWeight: "600",
    },

    descricaoTexto: {
        marginTop: 16,
        fontSize: 16,
        color: "#343a40",
        lineHeight: 24,
    },

    nutricaoLinha: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 22,
        gap: 16,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
    },

    nutricaoItem: {
        fontSize: 14,
        color: "#6c757d",
    },

    nutricaoValor: {
        fontWeight: "bold",
        color: "#1a1a1a",
    },
});