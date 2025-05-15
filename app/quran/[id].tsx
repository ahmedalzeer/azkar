import React from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    useWindowDimensions,
    FlatList,
    Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { colors, typography, spacing } from "../theme";
import Svg, { Path, G, Circle } from "react-native-svg";

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

    const renderPage = ({ item: page }: { item: Page }) => (
        <View style={[styles.pageContainer, { width }]}>
            {page.pageNumber === pages[0].pageNumber && (
                <View style={styles.surahHeaderContainer}>
                    <View style={styles.headerFrameContainer}>
                        <SurahHeaderFrame />
                    </View>
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
                    {page.verses.map((verse) => (
                        <View
                            key={verse.id}
                            style={[
                                styles.verseWrapper,
                                verse.line_start === 1 && styles.newLineVerse,
                            ]}
                        >
                            <ThemedText style={styles.verseText}>
                                {verse.aya_text_emlaey}{" "}
                                <View style={styles.verseNumberContainer}>
                                    <VerseNumberFrame />
                                    <ThemedText style={styles.verseNumber}>
                                        {verse.aya_no}
                                    </ThemedText>
                                </View>
                            </ThemedText>
                        </View>
                    ))}
                </View>

                <View style={styles.pageFooter}>
                    <View style={styles.pageNumberContainer}>
                        <PageNumberFrame />
                        <ThemedText style={styles.pageNumber}>
                            {page.pageNumber}
                        </ThemedText>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={pages}
                renderItem={renderPage}
                keyExtractor={(page) => page.pageNumber.toString()}
                horizontal
                pagingEnabled
                inverted
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={0}
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F3E8",
    },
    pageContainer: {
        flex: 1,
        paddingVertical: spacing.lg,
    },
    surahHeaderContainer: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: spacing.md,
        marginBottom: spacing.xl,
        position: "relative",
    },
    headerFrameContainer: {
        position: "absolute",
        width: "85%",
        height: "100%",
    },
    surahHeader: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.md,
        width: "100%",
    },
    surahTitle: {
        fontSize: 42,
        fontFamily: "HafsSmart_08",
        color: "#8A6E52",
        textAlign: "center",
    },
    pageContent: {
        flex: 1,
        paddingHorizontal: spacing.xl,
    },
    bismillah: {
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        marginBottom: spacing.xl,
    },
    bismillahText: {
        fontSize: 36,
        fontFamily: "HafsSmart_08",
        color: "#8A6E52",
        textAlign: "center",
    },
    versesContainer: {
        flex: 1,
        paddingBottom: spacing.xl * 2,
    },
    verseWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: spacing.sm,
    },
    newLineVerse: {
        marginTop: spacing.md,
    },
    verseText: {
        fontSize: 28,
        fontFamily: "HafsSmart_08",
        color: "#000000",
        textAlign: "right",
        lineHeight: 48,
    },
    verseNumberContainer: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
    },
    verseNumber: {
        position: "absolute",
        fontSize: 14,
        fontFamily: "HafsSmart_08",
        color: "#8A6E52",
    },
    pageFooter: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    pageNumberContainer: {
        position: "absolute",
        bottom: spacing.lg,
        alignSelf: "center",
        width: 60,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 16,
        fontFamily: "HafsSmart_08",
        color: "#8A6E52",
    },
});
