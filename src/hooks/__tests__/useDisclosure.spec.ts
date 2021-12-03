import { renderHook, act } from '@testing-library/react-hooks'

import { useDisclosure } from '../useDisclosure'

describe('hooks/useDisclosure', () => {
  test('method openでisOpenをtrueに変更', () => {
    const { result } = renderHook(() => useDisclosure())

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)
  })

  test('method closeでisOpenをfalseに変更', () => {
    const { result } = renderHook(() => useDisclosure())

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
  })

  test('method toggleでisOpenをtoggle', () => {
    const { result } = renderHook(() => useDisclosure())

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isOpen).toBe(false)
  })

  test('isOpenに初期状態が反映されている', () => {
    const { result } = renderHook(() => useDisclosure(true))

    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isOpen).toBe(false)
  })
})
