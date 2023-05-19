import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Dropdown.module.scss'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode, MutableRefObject } from 'react'

type DropdownProps = {
	className?: string
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const ANIMATION_DELAY = 100

export const Dropdown = memo((props: DropdownProps) => {
	const { className, children, isOpen, onClose, ...otherProps } = props

	const menuRef = useRef() as MutableRefObject<HTMLDivElement>
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
	const [open, setOpen] = useState(false)
	const [isClosing, setIsClosing] = useState(false)

	const openHandler = useCallback(() => {
		setOpen(true)
	}, [])

	const closeHandler = useCallback(() => {
		setIsClosing(true)
		timerRef.current = setTimeout(() => {
			onClose()
			setIsClosing(false)
		}, ANIMATION_DELAY)
	}, [onClose])


	const onkeydownHandler = useCallback((e:KeyboardEvent) => {
		if(e.key === 'Escape'){
			closeHandler()
		}
	}, [closeHandler])

	const outsideClickHandler = useCallback(({ target }: MouseEvent) => {
		if(menuRef.current && !menuRef.current?.contains(target as Node)) {
			closeHandler()
		}
	}, [closeHandler])


	useEffect(() => {
		if(isOpen){
			openHandler()
		}
	}, [isOpen, openHandler])

	useEffect(() => {
		openHandler()

		window.addEventListener('keydown', onkeydownHandler)
		document.addEventListener('mouseup', outsideClickHandler)
		return () => {
			clearTimeout(timerRef.current)
			document.removeEventListener('mouseup', outsideClickHandler)
			window.removeEventListener('keydown', onkeydownHandler)
		}
	}, [closeHandler, onkeydownHandler, openHandler, outsideClickHandler])

	const mods: Mods = {
		[cls.opened]: open,
		[cls.isClosing]: isClosing
	}

	return (
		<div className={classNames(cls.Dropdown, mods, [className])} {...otherProps} ref={menuRef}>
			{children}
		</div>
	)
})
