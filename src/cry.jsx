import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Cry = ({ cry, theme }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const audioRef = useRef(null);
    const [isPlaying,setIsPlaying] = useState(false);

    useEffect(() => {
        const getAudio = async () => {
            try {
                const res = await axios.get(cry, { responseType: "blob" });
                const audioBlob = res.data;
                const url = URL.createObjectURL(audioBlob);
                setAudioSrc(url);
            } catch (e) {
                console.error(e);
            }
        };
        getAudio();

        return () => {
            if (audioSrc) {
                URL.revokeObjectURL(audioSrc);
            }
        };
    }, [cry]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="cry">
            {audioSrc ? (
                <>
                    <audio ref={audioRef} src={audioSrc} />
                    <button
                        onClick={togglePlay}
                        className="cryButton"
                    >
                        PLAY CRY
                    </button>
                </>
            ) : <div className="cryButtonLoader"><div className="loader"></div></div>}
        </div>
    );
};

export default Cry;
