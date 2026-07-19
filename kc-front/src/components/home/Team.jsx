import PlayerCard from "./PlayerCard";
import { useEffect, useRef, useState } from "react";
import api from "../../api/api";


function Team() {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activePlayer, setActivePlayer] = useState(0);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await api.get("/players");

                setPlayers(response.data);
            }
            catch (error) {
                console.error("Failed to fetch players:", error);

                setError("Couldn't load the SQUAD.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchPlayers();
    }, []);

    const handleScroll = () => {
        const container = scrollContainerRef.current;

        if (!container) return;

        const cards = Array.from(container.children).filter(
        (child) => child.dataset.playerCard
        );

        const containerCenter =
        container.scrollLeft + container.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
        const cardCenter =
            card.offsetLeft + card.offsetWidth / 2;

        const distance = Math.abs(
            containerCenter - cardCenter
        );

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
        });

        setActivePlayer(closestIndex);
    };

    return (
        <section
        id="team"
        className="relative overflow-hidden bg-kc-bg py-20"
        >
        {/* Background Glow */}
        <div className="absolute -right-37.5 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-kc-blue/5 blur-[120px]" />

        {/* Header */}
        <div className="relative px-5">
            <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-7 bg-kc-blue" />

            <p className="font-heading text-[11px] font-semibold tracking-[0.3em] text-kc-blue">
                THE SQUAD
            </p>
            </div>

            <h2 className="font-heading text-[42px] font-bold uppercase leading-[0.9] text-kc-white">
            Meet The
            <br />
            <span className="text-kc-blue">
                Players.
            </span>
            </h2>

            <p className="mt-4 max-w-82.5 text-[13px] leading-6 text-kc-muted">
            Five friends. Five playstyles. One squad representing Khas
            Chowmuhani.
            </p>
        </div>

        {/* Swipe Hint */}
        <div className="mt-8 flex items-center justify-end gap-2 px-5">
            <span className="font-heading text-[10px] tracking-[0.2em] text-kc-muted">
            SWIPE TO EXPLORE
            </span>

            <span className="text-sm text-kc-blue">
            →
            </span>
        </div>

        {loading ? (
            <div className="mt-10 px-5 text-center">
                <p className="font-heading text-[11px] tracking-[0.2em] text-kc-muted">
                LOADING THE SQUAD...
                </p>
            </div>
            ) : error ? (
            <div className="mt-10 px-5 text-center">
                <p className="font-heading text-[11px] tracking-[0.2em] text-kc-muted">
                {error}
                </p>
            </div>
            ) : players.length === 0 ? (
            <div className="mt-10 border-y border-kc-border px-5 py-12 text-center">
                <p className="font-heading text-[22px] font-bold uppercase text-kc-white">
                SQUAD ASSEMBLING...
                </p>

                <p className="mt-2 text-[12px] text-kc-muted">
                The players haven't entered the lobby yet.
                </p>
            </div>
            ) : (
            <>
                {/* Player Cards */}
                <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6"
                style={{
                    scrollbarWidth: "none",
                    WebkitOverflowScrolling: "touch",
                }}
                >
                {players.map((player, index) => (
                    <div
                    key={player.id}
                    data-player-card
                    className="w-[82vw] max-w-85 shrink-0 snap-center"
                    >
                    <PlayerCard
                        player={player}
                        number={index + 1}
                    />
                    </div>
                ))}

                <div className="w-1 shrink-0" />
                </div>

                {/* Player Indicators */}
                <div className="mt-2 flex items-center justify-center gap-2">
                {players.map((player, index) => (
                    <button
                    key={player.id}
                    onClick={() => {
                        const container = scrollContainerRef.current;

                        if (!container) return;

                        const cards = Array.from(
                        container.children
                        ).filter(
                        (child) => child.dataset.playerCard
                        );

                        cards[index]?.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                        block: "nearest",
                        });
                    }}
                    aria-label={`View ${player.ign}`}
                    className={`h-1 transition-all duration-300 ${
                        activePlayer === index
                        ? "w-6 bg-kc-blue"
                        : "w-2 bg-kc-border"
                    }`}
                    />
                ))}
                </div>
            </>
            )}
        </section>
    );
}

export default Team;