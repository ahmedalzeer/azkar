import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    useWindowDimensions,
    FlatList,
    Image,
    Pressable,
    ViewToken,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { colors, typography, spacing } from "../theme";
import Svg, { Path, G, Circle } from "react-native-svg";
import * as Font from "expo-font";

// Import the Quran data
const quranData = require("../../assets/hafs_smart_v8.json");

interface Verse {
    id: number;
    jozz: number;
    sura_no: number;
    sura_name_en: string;
    sura_name_ar: string;
    page: number;
    line_start: number;
    line_end: number;
    aya_no: number;
    aya_text: string;
    aya_text_emlaey: string;
}

interface Page {
    pageNumber: number;
    verses: Verse[];
}

const SurahHeaderFrame = () => (
    <Svg width="100%" height="100%" viewBox="0 0 300 80">
        {/* Main frame */}
        <Path
            d="M20,10 
               L260,10 
               Q280,10 280,30 
               L280,50 
               Q280,70 260,70 
               L20,70 
               Q10,70 10,50 
               L10,30 
               Q10,10 20,10"
            fill="#F4ECD3"
            stroke="#8A6E52"
            strokeWidth="2"
        />
        {/* Decorative corners */}
        <Path
            d="M20,15 Q25,15 25,20 L25,25 Q25,30 20,30 L15,30 Q10,30 10,25 L10,20 Q10,15 15,15 Z"
            fill="#8A6E52"
            stroke="none"
        />
        <Path
            d="M280,15 Q275,15 275,20 L275,25 Q275,30 280,30 L285,30 Q290,30 290,25 L290,20 Q290,15 285,15 Z"
            fill="#8A6E52"
            stroke="none"
        />
        <Path
            d="M20,55 Q25,55 25,60 L25,65 Q25,70 20,70 L15,70 Q10,70 10,65 L10,60 Q10,55 15,55 Z"
            fill="#8A6E52"
            stroke="none"
        />
        <Path
            d="M280,55 Q275,55 275,60 L275,65 Q275,70 280,70 L285,70 Q290,70 290,65 L290,60 Q290,55 285,55 Z"
            fill="#8A6E52"
            stroke="none"
        />
        {/* Decorative lines */}
        <Path
            d="M30,20 L270,20 M30,60 L270,60"
            stroke="#8A6E52"
            strokeWidth="1"
            strokeDasharray="5,3"
        />
    </Svg>
);

const VerseNumberFrame = () => (
    <Svg width="40" height="40" viewBox="0 0 40 40">
        <G transform="translate(20, 20)">
            {/* Outer circle */}
            <Path
                d="M-18,-18 
                   A18,18 0 1,1 18,18 
                   A18,18 0 1,1 -18,-18"
                fill="#F4ECD3"
                stroke="#8A6E52"
                strokeWidth="1"
            />
            {/* Inner circle */}
            <Path
                d="M-15,-15 
                   A15,15 0 1,1 15,15 
                   A15,15 0 1,1 -15,-15"
                fill="none"
                stroke="#8A6E52"
                strokeWidth="0.5"
            />
            {/* Decorative dots */}
            <Circle cx="0" cy="-16" r="1" fill="#8A6E52" />
            <Circle cx="0" cy="16" r="1" fill="#8A6E52" />
            <Circle cx="16" cy="0" r="1" fill="#8A6E52" />
            <Circle cx="-16" cy="0" r="1" fill="#8A6E52" />
        </G>
    </Svg>
);

const PageNumberFrame = () => (
    <Svg width="60" height="30" viewBox="0 0 60 30">
        {/* Main shape */}
        <Path
            d="M5,2 
               L55,2 
               Q58,2 58,5 
               L58,25 
               Q58,28 55,28 
               L5,28 
               Q2,28 2,25 
               L2,5 
               Q2,2 5,2"
            fill="#F4ECD3"
            stroke="#8A6E52"
            strokeWidth="1"
        />
        {/* Decorative elements */}
        <Path
            d="M10,8 L50,8 M10,22 L50,22"
            stroke="#8A6E52"
            strokeWidth="0.5"
            strokeDasharray="3,2"
        />
    </Svg>
);

export default function SurahScreen() {
    const { id } = useLocalSearchParams();
    const { width } = useWindowDimensions();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const flatListRef = React.useRef(null);

    const viewabilityConfig = React.useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const onViewableItemsChanged = React.useCallback(
        ({
            viewableItems,
        }: {
            viewableItems: ViewToken[];
            changed: ViewToken[];
        }) => {
            if (viewableItems.length > 0 && viewableItems[0].index !== null) {
                setCurrentPage(viewableItems[0].index);
            }
        },
        []
    );

    // Load fonts
    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    hafs: require("../../assets/fonts/hafs.ttf"),
                });
                setFontsLoaded(true);
            } catch (error) {
                console.error("Error loading fonts:", error);
            }
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ThemedText>جاري تحميل الخط...</ThemedText>
                </View>
            </View>
        );
    }

    // Convert id to number since sura_no is numeric in the new format
    const surahNumber = typeof id === "string" ? parseInt(id) : 1;

    // Get all verses for this surah
    const verses = quranData.filter(
        (verse: Verse) => verse.sura_no === surahNumber
    );

    // Group verses by page
    const pageMap = new Map<number, Verse[]>();
    verses.forEach((verse: Verse) => {
        if (!pageMap.has(verse.page)) {
            pageMap.set(verse.page, []);
        }
        pageMap.get(verse.page)?.push(verse);
    });

    // Convert map to array and sort by page number
    const pages: Page[] = Array.from(pageMap.entries())
        .map(([pageNumber, verses]) => ({
            pageNumber,
            verses: verses.sort((a, b) => a.aya_no - b.aya_no),
        }))
        .sort((a, b) => a.pageNumber - b.pageNumber);

    // Get surah info from the first verse
    const surahInfo =
        verses.length > 0
            ? {
                  titleAr: verses[0].sura_name_ar,
                  title: verses[0].sura_name_en,
                  count: verses.length,
                  // We'll determine Makkiyah/Madaniyah based on surah number
                  type: surahNumber > 28 ? "Makkiyah" : "Madaniyah",
              }
            : null;

    if (!surahInfo || verses.length === 0) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Surah not found</ThemedText>
            </ThemedView>
        );
    }

    // Don't show Bismillah for Surah At-Tawbah (Surah 9)
    const showBismillah = surahNumber !== 9;

    const renderPage = ({
        item: page,
        index,
    }: {
        item: Page;
        index: number;
    }) => (
        <ScrollView
            style={[styles.pageContainer, { width }]}
            showsVerticalScrollIndicator={false}
        >
            {page.pageNumber === pages[0].pageNumber && (
                <View style={styles.surahHeaderContainer}>
                    {/* <View style={styles.headerFrameContainer}>
                        <SurahHeaderFrame />
                    </View> */}
                    <View style={styles.surahHeader}>
                        <ThemedText style={styles.surahTitle}>
                            {surahInfo.titleAr}
                        </ThemedText>
                    </View>
                </View>
            )}

            <View style={styles.pageContent}>
                {page.pageNumber === pages[0].pageNumber &&
                    showBismillah &&
                    surahNumber !== 1 && (
                        <View style={styles.bismillah}>
                            <ThemedText style={styles.bismillahText}>
                                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                            </ThemedText>
                        </View>
                    )}

                <View style={styles.versesContainer}>
                    <ThemedText style={styles.verseText}>
                        {page.verses
                            .map((verse) => `${verse.aya_text} `)
                            .join("")}
                    </ThemedText>
                </View>
            </View>
        </ScrollView>
    );

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <FlatList
                ref={flatListRef}
                data={pages}
                renderItem={renderPage}
                keyExtractor={(page) => page.pageNumber.toString()}
                horizontal
                inverted
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                windowSize={3}
                maxToRenderPerBatch={3}
                removeClippedSubviews={true}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F3E8",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pageContainer: {
        flex: 1,
        paddingVertical: spacing.lg,
    },
    pageContent: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        backgroundColor: "#FFFFFF",
        paddingVertical: spacing.md,
    },
    bismillah: {
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        marginBottom: spacing.xl,
    },
    bismillahText: {
        fontSize: 36,
        fontFamily: "hafs",
        color: "#8A6E52",
        textAlign: "center",
    },
    versesContainer: {
        flex: 1,
    },
    verseText: {
        fontSize: 26,
        fontFamily: "hafs",
        color: "#000000",
        textAlign: "right",
        lineHeight: 55,
        writingDirection: "rtl",
    },
    surahHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: spacing.md,
    },
    headerFrameContainer: {
        marginRight: spacing.md,
    },
    surahHeader: {
        flex: 1,
    },
    surahTitle: {
        fontSize: 24,
        fontFamily: "hafs",
        color: "#8A6E52",
        textAlign: "center",
    },
});
