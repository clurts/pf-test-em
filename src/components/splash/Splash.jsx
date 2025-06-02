import { useEffect, useState } from "react"
import "./_Splash.scss";

export default function Splash(){
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);
    const [showMiddle, setShowMiddle] = useState(false);
    const [isHiding, setIsHiding] = useState(false);

    useEffect(() => {
        // start animation:
        const timer1 = setTimeout(() => {
            setShowTop(true);
        }, 100);
        const timer2 = setTimeout(() => {
            setShowBottom(true);
        }, 700);

        const timer3 = setTimeout(() => {
            setShowMiddle(true);
        }, 1400);

        const timer4 = setTimeout(() => {
            setIsHiding(true);
        }, 2500);

        // Cleanup timers:
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
        }
         
    }, [])

    return (
        <div className={`intro ${isHiding ? 'hide' : ''}`}>
            <div className="logo">
                <img 
                    src="/logo-top.png" 
                    className={`logo__part top ${showTop ? 'animate-top' : ''}`}
                    alt="E-Thon logo top part" 
                    style={{ 
                        opacity: isHiding ? '0' : '1',
                        transform: showTop ? '' : 'translateX(100vw)',
                        transition: isHiding ? 'opacity 0.3s ease-out' : 'none'
                    }}
                />
                <img 
                    src="/logo-middle.png" 
                    className={`logo__part middle ${showMiddle ? 'animate-middle' : ''}`}
                    alt="E-Thon logo middle part" 
                    style={{ 
                        opacity: isHiding ? '0' : '1',
                        transform: showMiddle ? '' : 'scale(0)',
                        transition: isHiding ? 'opacity 0.3s ease-out' : 'none'
                    }}
                />
                <img 
                    src="/logo-bottom.png" 
                    className={`logo__part bottom ${showBottom ? 'animate-bottom' : ''}`}
                    alt="E-Thon logo bottom part" 
                    style={{ 
                        opacity: isHiding ? '0' : '1',
                        transform: showBottom ? '' : 'translateX(-100vw)',
                        transition: isHiding ? 'opacity 0.3s ease-out' : 'none'
                    }}
                />
            </div>
        </div>
    )
}