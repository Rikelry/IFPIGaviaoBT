import { Image, StyleSheet, Text, View } from "react-native";

type ProductImageProps = {
    imagem: number;
    imagemGrande: number;
    nome: string;
};

export function ProductImage({
    imagem,
    imagemGrande,
    nome,
}: ProductImageProps) {
    return (
        <View style={styles.cardFoto}>
            <Image
                source={imagemGrande || imagem}
                style={styles.fotoGrande}
                resizeMode="cover"
            />

            <View style={styles.overlayFoto}>
                <Text style={styles.overlayTexto}>{nome}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardFoto: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#eaeaea",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        position: "relative",
    },

    fotoGrande: {
        width: "100%",
        height: 240,
    },

    overlayFoto: {
        position: "absolute",
        bottom: 10,
        right: 12,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },

    overlayTexto: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "500",
    },
});