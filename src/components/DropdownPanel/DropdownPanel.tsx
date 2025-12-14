import { useCallback, useRef, useState } from 'react'

import useOnClickOutside from 'helpers/hooks/useOnClickOutside'
import { DropdownWrapper, Wrapper } from './styled'

interface I_DropdownPanel {
    toggler: any
    children: React.ReactElement
    toLeft?: boolean
}

const DropdownPanel: React.FC<I_DropdownPanel> = ({
    toggler,
    children,
    toLeft = false,
}: I_DropdownPanel) => {
    const dropdownWrapperRef = useRef<HTMLDivElement | null>(null)

    const [ isVisible, setVisible ] = useState<boolean>(false)

    const toggleVisibility = useCallback(() => {
        setVisible((current) => !current)
    }, [])

    useOnClickOutside(dropdownWrapperRef, () => setVisible(false))

    const Toggler = toggler

    return (
        <Wrapper>
            <Toggler onClick={toggleVisibility} />
            {isVisible && (
                <DropdownWrapper
                ref={dropdownWrapperRef}
                toLeft={toLeft}
            >
                {children}
            </DropdownWrapper>
            )}
        </Wrapper>
    )


}

export default DropdownPanel
