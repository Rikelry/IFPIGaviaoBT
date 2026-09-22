```
.
├── app
│   ├── category
│   │   └── [id].tsx
│   ├── index.tsx
│   ├── item
│   │   └── [id].tsx
│   └── _layout.tsx
└── data
    └── mockDatabase.ts
```

src/app/category/[id].tsx:

    // ============================================================================
    // PADRÃO BIG TRIPE (ANTI-PADRÃO: TUDO NO MESMO ARQUIVO)
    // Tela de Categoria: Listagem de Itens por Categoria selecionada
    // ============================================================================

    import { Ionicons } from "@expo/vector-icons";
    import React, { useState, useEffect } from "react";
    import { useLocalSearchParams, useRouter } from "expo-router";
    import { SafeAreaView } from "react-native-safe-area-context";
    import { simularConsultaProdutosPorCategoria } from "../../data/mockDatabase";
    import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator, } from "react-native";

    export default function CategoryScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    // Estados locais controlados na própria View (Sem separação de ViewModel)
    const [carregando, setCarregando] = useState<boolean>(true);
    const [produtos, setProdutos] = useState<any[]>([]);

    // Título amigável da categoria
    const nomeCategoria =
        id === "bebidas" ? "Bebidas" : id === "comidas" ? "Comidas" : "Cardápio";

    useEffect(() => {
        // Consulta direta com atraso simulado de banco de dados
        async function carregarProdutos() {
        if (!id) return;
        try {
            setCarregando(true);
            const resultado = await simularConsultaProdutosPorCategoria(
            Array.isArray(id) ? id[0] : id
            );
            setProdutos(resultado);
        } catch (erro) {
            console.error("Erro ao buscar produtos da categoria:", erro);
        } finally {
            setCarregando(false);
        }
        }

        carregarProdutos();
    }, [id]);

    // Função auxiliar de formatação de moeda dentro do arquivo da tela
    function formatarPreco(valor: number): string {
        return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    }

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
                <TouchableOpacity
                activeOpacity={0.85}
                style={styles.cardItem}
                onPress={() => router.push(`/item/${item.id}` as any)}
                >
                {/* Miniatura do Produto */}
                <Image
                    source={item.imagem}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />

                {/* Informações Centrais: Nome e Preço */}
                <View style={styles.infoContainer}>
                    <Text style={styles.nomeItem}>{item.nome}</Text>
                    <Text style={styles.precoItem}>
                    {formatarPreco(item.preco)}
                    </Text>
                </View>

                {/* Seta Indicativa à Direita */}
                <Ionicons name="chevron-forward" size={22} color="#b0b5be" />
                </TouchableOpacity>
            )}
            />
        )}
        </View>
    );
    }

    // Estilos concentrados diretamente no próprio arquivo (Padrão Big Tripe)
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

src/app/item/[id].tsx:
    // ============================================================================
    // PADRÃO BIG TRIPE (ANTI-PADRÃO: TUDO NO MESMO ARQUIVO)
    // Tela de Detalhes do Produto: Apresentação completa e controle de quantidade
    // ============================================================================

    import React, { useState, useEffect } from "react";
    import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    } from "react-native";
    import { SafeAreaView } from "react-native-safe-area-context";
    import { useLocalSearchParams, useRouter } from "expo-router";
    import { Ionicons } from "@expo/vector-icons";
    import { simularConsultaProdutoPorId } from "../../data/mockDatabase";

    export default function ItemDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    // Estados locais controlados diretamente na tela (Sem ViewModel)
    const [carregando, setCarregando] = useState<boolean>(true);
    const [produto, setProduto] = useState<any>(null);
    const [quantidade, setQuantidade] = useState<number>(1);

    useEffect(() => {
        // Consulta direta ao banco de dados com simulação de delay
        async function carregarDetalhes() {
        if (!id) return;
        try {
            setCarregando(true);
            const prodId = Array.isArray(id) ? id[0] : id;
            const resultado = await simularConsultaProdutoPorId(prodId);
            setProduto(resultado);
        } catch (erro) {
            console.error("Erro ao buscar detalhes do produto:", erro);
        } finally {
            setCarregando(false);
        }
        }

        carregarDetalhes();
    }, [id]);

    // Lógica de negócio de incremento/decremento embutida diretamente na View
    function decrementarQuantidade() {
        if (quantidade > 1) {
        setQuantidade((prev) => prev - 1);
        }
    }

    function incrementarQuantidade() {
        setQuantidade((prev) => prev + 1);
    }

    function formatarPreco(valor: number): string {
        return `R$ ${valor.toFixed(2).replace(".", ",")}`;
    }

    return (
        <View style={styles.tela}>
        {/* CABEÇALHO ROXO COM BOTÃO < VOLTAR */}
        <View style={styles.cabecalhoContainer}>
            <SafeAreaView edges={["top"]}>
            <View style={styles.cabecalhoLinha}>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.botaoVoltar}
                onPress={() => router.back()}
                >
                <Ionicons name="chevron-back" size={24} color="#ffffff" />
                <Text style={styles.textoVoltar}>Voltar</Text>
                </TouchableOpacity>

                <Text style={styles.tituloHeader}>Detalhes do Lanche</Text>

                <View style={styles.espacadorHeader} />
            </View>
            </SafeAreaView>
        </View>

        {/* CONTEÚDO PRINCIPAL COM ROLAGEM */}
        {carregando ? (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#501673" />
            <Text style={styles.loadingTexto}>Carregando detalhes do item...</Text>
            </View>
        ) : produto ? (
            <ScrollView
            contentContainerStyle={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
            >
            {/* FOTO GRANDE DO PRODUTO */}
            <View style={styles.cardFoto}>
                <Image
                source={produto.imagemGrande || produto.imagem}
                style={styles.fotoGrande}
                resizeMode="cover"
                />
                {/* Etiqueta Sobreposta no Canto Inferior da Foto */}
                <View style={styles.overlayFoto}>
                <Text style={styles.overlayTexto}>{produto.nome}</Text>
                </View>
            </View>

            {/* ÁREA DE DETALHES E INFORMAÇÕES */}
            <View style={styles.infoSecao}>
                {/* Título do Produto e Badge de Preço */}
                <View style={styles.tituloPrecoLinha}>
                <Text style={styles.nomeProduto}>{produto.nome}</Text>
                <View style={styles.badgePreco}>
                    <Text style={styles.textoBadgePreco}>
                    {formatarPreco(produto.preco)}
                    </Text>
                </View>
                </View>

                {/* Tag da Categoria */}
                <View style={styles.categoriaTag}>
                <Text style={styles.textoCategoriaTag}>
                    {produto.categoriaNome || "Lanche"}
                </Text>
                </View>

                {/* Descrição do Produto */}
                <Text style={styles.descricaoTexto}>{produto.descricao}</Text>

                {/* Informações Nutricionais */}
                <View style={styles.nutricaoLinha}>
                <Text style={styles.nutricaoItem}>
                    Proteínas:{" "}
                    <Text style={styles.nutricaoValor}>{produto.proteinas}</Text>
                </Text>
                <Text style={styles.nutricaoItem}>
                    Carboidratos:{" "}
                    <Text style={styles.nutricaoValor}>{produto.carboidratos}</Text>
                </Text>
                <Text style={styles.nutricaoItem}>
                    Gorduras:{" "}
                    <Text style={styles.nutricaoValor}>{produto.gorduras}</Text>
                </Text>
                </View>

                {/* Controle de Quantidade */}
                <View style={styles.quantidadeLinha}>
                <Text style={styles.quantidadeLabel}>Quantidades:</Text>

                <View style={styles.seletorContainer}>
                    {/* Botão Menos (Roxo) */}
                    <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnMenos}
                    onPress={decrementarQuantidade}
                    >
                    <Ionicons name="remove" size={20} color="#ffffff" />
                    </TouchableOpacity>

                    {/* Número da Quantidade */}
                    <Text style={styles.numeroQuantidade}>{quantidade}</Text>

                    {/* Botão Mais (Verde) */}
                    <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnMais}
                    onPress={incrementarQuantidade}
                    >
                    <Ionicons name="add" size={20} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                </View>

                {/* Botão Voltar ao Cardápio */}
                <TouchableOpacity
                activeOpacity={0.88}
                style={styles.btnVoltarCardapio}
                onPress={() => router.back()}
                >
                <Text style={styles.textoBtnVoltar}>Voltar ao Cardápio</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        ) : (
            <View style={styles.erroContainer}>
            <Text style={styles.erroTexto}>Item não encontrado.</Text>
            </View>
        )}
        </View>
    );
    }

    // Estilos Big Tripe misturados diretamente no arquivo da tela
    const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#ffffff",
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
    conteudoScroll: {
        paddingBottom: 40,
    },
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
    quantidadeLinha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 26,
    },
    quantidadeLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    seletorContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnMenos: {
        width: 34,
        height: 34,
        borderRadius: 6,
        backgroundColor: "#501673",
        alignItems: "center",
        justifyContent: "center",
    },
    numeroQuantidade: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginHorizontal: 16,
        minWidth: 18,
        textAlign: "center",
    },
    btnMais: {
        width: 34,
        height: 34,
        borderRadius: 6,
        backgroundColor: "#248232",
        alignItems: "center",
        justifyContent: "center",
    },
    btnVoltarCardapio: {
        backgroundColor: "#501673",
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    textoBtnVoltar: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
    },
    loadingTexto: {
        marginTop: 12,
        fontSize: 15,
        color: "#6c757d",
    },
    erroContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
    },
    erroTexto: {
        fontSize: 16,
        color: "#dc3545",
    },
    });

src/app/_layout.tsx:
    import { Stack } from "expo-router";
    import { StatusBar } from "expo-status-bar";

    export default function RootLayout() {
    return (
        <>
        <StatusBar style="light" backgroundColor="#501673" />
        <Stack
            screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#ffffff" },
            }}
        />
        </>
    );
    }

src/app/index.tsx:
    // ============================================================================
    // PADRÃO BIG TRIPE (ANTI-PADRÃO: TUDO NO MESMO ARQUIVO)
    // Tela Inicial: Apresentação das Categorias (Comidas e Bebidas)
    // ============================================================================

    import React, { useState, useEffect } from "react";
    import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
    } from "react-native";
    import { SafeAreaView } from "react-native-safe-area-context";
    import { useRouter } from "expo-router";
    import { Ionicons } from "@expo/vector-icons";
    import { simularConsultaCategorias } from "../data/mockDatabase";

    export default function HomeScreen() {
    const router = useRouter();

    // Estados gerenciados diretamente na View (Sem ViewModel)
    const [carregando, setCarregando] = useState<boolean>(true);
    const [categorias, setCategorias] = useState<any[]>([]);

    useEffect(() => {
        // Busca direta do banco simulado com delay assíncrono
        async function carregarDados() {
        try {
            setCarregando(true);
            const resultado = await simularConsultaCategorias();
            setCategorias(resultado);
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        } finally {
            setCarregando(false);
        }
        }

        carregarDados();
    }, []);

    return (
        <View style={styles.tela}>
        {/* CABEÇALHO ROXO COM BORDAS ARREDONDADAS */}
        <View style={styles.cabecalhoContainer}>
            <SafeAreaView edges={["top"]}>
            <View style={styles.cabecalhoConteudo}>
                {/* Linha com Ícone do Gavião e Nome da Lanchonete */}
                <View style={styles.logoLinha}>
                <Image
                    source={require("../../assets/images/menu/gaviao-logo.png")}
                    style={styles.logoGaviao}
                    resizeMode="contain"
                />
                <Text style={styles.tituloHeader}>IFPI Gavião</Text>
                </View>

                {/* Mensagem de Boas-Vindas */}
                <Text style={styles.subtituloTexto}>
                O que você deseja pedir hoje?
                </Text>
                <Text style={styles.subtituloDestaque}>Escolha uma categoria:</Text>
            </View>
            </SafeAreaView>
        </View>

        {/* ÁREA DE CONTEÚDO */}
        <ScrollView
            contentContainerStyle={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
        >
            {carregando ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#501673" />
                <Text style={styles.loadingTexto}>Consultando cardápio...</Text>
            </View>
            ) : (
            <View style={styles.gridCategorias}>
                {categorias.map((cat) => (
                <TouchableOpacity
                    key={cat.id}
                    activeOpacity={0.88}
                    style={[styles.cardCategoria, { borderColor: cat.corBorda }]}
                    onPress={() => router.push(`/category/${cat.id}` as any)}
                >
                    {/* Imagem de Capa da Categoria */}
                    <Image
                    source={cat.imagem}
                    style={styles.imagemCategoria}
                    resizeMode="cover"
                    />

                    {/* Rodapé do Card com Nome e Seta */}
                    <View style={styles.rodapeCard}>
                    <Text style={styles.nomeCategoria}>{cat.nome}</Text>
                    <Ionicons
                        name="arrow-forward"
                        size={20}
                        color={cat.corSeta}
                    />
                    </View>
                </TouchableOpacity>
                ))}
            </View>
            )}
        </ScrollView>
        </View>
    );
    }

    // Estilos gigantescos concentrados no final do arquivo da tela (Típico do Big Tripe)
    const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    cabecalhoContainer: {
        backgroundColor: "#501673",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingBottom: 28,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    cabecalhoConteudo: {
        alignItems: "center",
        paddingTop: 12,
    },
    logoLinha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    logoGaviao: {
        width: 38,
        height: 38,
        marginRight: 10,
    },
    tituloHeader: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#ffffff",
        letterSpacing: 0.3,
    },
    subtituloTexto: {
        fontSize: 15,
        color: "#ffffff",
        textAlign: "center",
        opacity: 0.95,
        lineHeight: 22,
    },
    subtituloDestaque: {
        fontSize: 15,
        fontWeight: "600",
        color: "#ffffff",
        textAlign: "center",
        lineHeight: 22,
    },
    conteudoScroll: {
        paddingVertical: 28,
        paddingHorizontal: 16,
        flexGrow: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
    },
    loadingTexto: {
        marginTop: 12,
        fontSize: 15,
        color: "#6c757d",
    },
    gridCategorias: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 14,
    },
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

src/data/mockDatabase.ts: 
    // ============================================================================
    // SIMULAÇÃO DO BANCO DE DADOS LOCAL (IFPI GAVIÃO)
    // ATENÇÃO: Este banco simula um atraso de rede/I/O assíncrono (como SQLite/API real)
    // No padrão Big Tripe, as telas importam e manipulam diretamente estas funções e dados
    // sem tipagem formal, repositórios ou ViewModels.
    // ============================================================================

    const DELAY_MS = 600; // Simula 600ms de latência de consulta local

    export const BANCO_CATEGORIAS = [
    {
        id: "comidas",
        nome: "Comidas",
        corBorda: "#501673",
        corSeta: "#501673",
        imagem: require("../../assets/images/menu/categoria-comidas.png"),
    },
    {
        id: "bebidas",
        nome: "Bebidas",
        corBorda: "#1b873f",
        corSeta: "#1b873f",
        imagem: require("../../assets/images/menu/categoria-bebidas.png"),
    },
    ];

    export const BANCO_PRODUTOS = [
    {
        id: "pastel-de-carne",
        categoriaId: "comidas",
        categoriaNome: "Comida",
        nome: "Pastel de Carne",
        preco: 6.0,
        descricao:
        "Pastel frito na hora bem crocante e sequinho, com recheio farto de carne moída selecionada, temperada com cheiro verde e azeitonas.",
        proteinas: "14g",
        carboidratos: "32g",
        gorduras: "18g",
        imagem: require("../../assets/images/menu/pastel-de-carne.png"),
        imagemGrande: require("../../assets/images/menu/pastel-de-carne.png"),
    },
    {
        id: "coxinha-de-frango",
        categoriaId: "comidas",
        categoriaNome: "Comida",
        nome: "Coxinha de Frango",
        preco: 7.0,
        descricao:
        "Clássica coxinha de frango com massa macia de batata, empanada crocante dourada por fora e recheio de peito de frango desfiado com requeijão.",
        proteinas: "18g",
        carboidratos: "38g",
        gorduras: "15g",
        imagem: require("../../assets/images/menu/coxinha-de-frango.png"),
        imagemGrande: require("../../assets/images/menu/coxinha-de-frango.png"),
    },
    {
        id: "cuscuz-com-ovo",
        categoriaId: "comidas",
        categoriaNome: "Comida",
        nome: "Cuscuz com Ovo",
        preco: 8.0,
        descricao:
        "Tradicional cuscuz nordestino de milho flocado feito no vapor, servido quentinho com ovo frito na manteiga da terra e uma pitada de sal.",
        proteinas: "12g",
        carboidratos: "40g",
        gorduras: "9g",
        imagem: require("../../assets/images/menu/cuscuz-com-ovo.png"),
        imagemGrande: require("../../assets/images/menu/cuscuz-com-ovo.png"),
    },
    {
        id: "arrumadinho-completo",
        categoriaId: "comidas",
        categoriaNome: "Comida",
        nome: "Arrumadinho Completo",
        preco: 14.0,
        descricao:
        "Carne de sol desfiada, arroz branco soltinho e creme de galinha caseiro.",
        proteinas: "22g",
        carboidratos: "45g",
        gorduras: "12g",
        imagem: require("../../assets/images/menu/arrumadinho-completo.png"),
        imagemGrande: require("../../assets/images/menu/arrumadinho-completo-large.png"),
    },
    {
        id: "suco-de-laranja",
        categoriaId: "bebidas",
        categoriaNome: "Bebida",
        nome: "Suco de Laranja",
        preco: 7.0,
        descricao:
        "Suco 100% natural de laranjas frescas espremidas na hora, sem conservantes, servido com gelo bem refrescante.",
        proteinas: "2g",
        carboidratos: "26g",
        gorduras: "0g",
        imagem: require("../../assets/images/menu/suco-de-laranja.png"),
        imagemGrande: require("../../assets/images/menu/suco-de-laranja.png"),
    },
    {
        id: "refrigerante-lata",
        categoriaId: "bebidas",
        categoriaNome: "Bebida",
        nome: "Refrigerante Lata",
        preco: 5.0,
        descricao:
        "Refrigerante geladíssimo em lata 350ml. Escolha entre Coca-Cola tradicional, Coca-Cola Zero ou Guaraná Antarctica.",
        proteinas: "0g",
        carboidratos: "37g",
        gorduras: "0g",
        imagem: require("../../assets/images/menu/refrigerante.png"),
        imagemGrande: require("../../assets/images/menu/refrigerante.png"),
    },
    {
        id: "cafe-expresso",
        categoriaId: "bebidas",
        categoriaNome: "Bebida",
        nome: "Café Expresso",
        preco: 4.0,
        descricao:
        "Café expresso curto encorpado e aromático, feito com grãos especiais moídos na hora, com crema espessa e sabor marcante.",
        proteinas: "0g",
        carboidratos: "1g",
        gorduras: "0g",
        imagem: require("../../assets/images/menu/cafe-expresso.png"),
        imagemGrande: require("../../assets/images/menu/cafe-expresso.png"),
    },
    {
        id: "suco-acerola",
        categoriaId: "bebidas",
        categoriaNome: "Bebida",
        nome: "Suco de Acerola",
        preco: 6.5,
        descricao:
        "Suco de acerola com polpa pura, fonte concentrada de vitamina C e antioxidantes, servido com pedras de gelo.",
        proteinas: "1g",
        carboidratos: "15g",
        gorduras: "0g",
        imagem: require("../../assets/images/menu/suco-acerola.png"),
        imagemGrande: require("../../assets/images/menu/suco-acerola.png"),
    },
    ];

    // Funções de consulta com simulação de delay assíncrono (simulando IO de banco de dados)
    export async function simularConsultaCategorias() {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return [...BANCO_CATEGORIAS];
    }

    export async function simularConsultaProdutosPorCategoria(categoriaId: string) {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return BANCO_PRODUTOS.filter((p) => p.categoriaId === categoriaId);
    }

    export async function simularConsultaProdutoPorId(produtoId: string) {
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    return BANCO_PRODUTOS.find((p) => p.id === produtoId);
    }
