import {
  Key,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useControlValue } from '@/lib/use-control-value'
import classNames from 'classnames'
import BaseInput from '@/components/ui/BaseInput'
import BaseButton from '@/components/ui/BaseButton'
import ControlContainer from '@/components/ui/ControlContainer'
import WithPopover from '@/components/ui/WithPopover'
import Sandwich from '@/components/ui/Sandwich'
import Icon from '@/components/ui/Icon'
import styles from './Select.module.scss'

interface Item<ItemValue> {
  key: Key
  value: ItemValue
}

type Value<IsMultiple> = IsMultiple extends true ? Key[] : Key

interface Props<ItemValue, IsMultiple extends boolean> {
  className?: string
  label?: string
  postscript?: string
  error?: string
  placeholder?: string
  multiple?: IsMultiple
  clearable?: boolean
  inputtable?: boolean
  items?: Item<ItemValue>[]
  value?: Value<IsMultiple>
  onChange?: (val: Value<IsMultiple>) => void
  renderItem?: (item: Item<ItemValue>) => ReactNode
  filterItem?: (item: Item<ItemValue>, query: string) => boolean
  onFocus?: any
  onBlur?: any
}

export default function Select<
  ItemValue = unknown,
  IsMultiple extends boolean = false,
>({
  className,
  label,
  postscript,
  error,
  placeholder,
  multiple: isMultiple,
  clearable: isClearable,
  inputtable: isInputtable,
  items = [],
  value: baseValue,
  onChange: baseOnChange,
  renderItem,
  filterItem,
  onFocus,
  onBlur,
}: Props<ItemValue, IsMultiple>) {
  // TODO: ref - for react hook form
  // TODO: accessabilty
  // TODO: add extra method to transform value for input

  const inputRef = useRef<HTMLInputElement | null>(null)

  const { value, onChange } = useControlValue({
    baseValue,
    baseOnChange: baseOnChange as any,
    transformBaseValue: (val: Key | Key[] | undefined) =>
      Array.isArray(val) ? val : val === undefined ? [] : [val],
    transformValue: (val) => (isMultiple ? val : val[0]),
  })

  const [isActive, setIsActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState<null | string>(null)

  useEffect(() => {
    if (!isActive) {
      setQuery(null)
      inputRef.current?.blur()
    }
  }, [isActive])

  const onInputClick: MouseEventHandler = (e) => {
    if (!isActive) {
      setIsActive(true)
    } else if ((e.target as Element).tagName !== 'INPUT') {
      setIsActive(false)
      inputRef.current?.blur()
    }
  }

  const toggleItem = (item: Item<ItemValue>) => {
    if (isMultiple) {
      const idx = value.indexOf(item.key)
      if (idx === -1) {
        onChange([...value, item.key])
      } else {
        onChange([...value.slice(0, idx), ...value.slice(idx + 1)])
      }
    } else {
      if (isClearable && value.includes(item.key)) {
        onChange([])
      } else {
        onChange([item.key])
      }
      setIsActive(false)
    }
  }

  const clear = () => {
    onChange([])
    setIsActive(false)
  }

  const renderedItems = useMemo(() => {
    const filteredItems = items.filter(
      (item) =>
        !isInputtable ||
        query === null ||
        (filterItem?.(item, query) ??
          item.value?.toString().toLowerCase().includes(query.toLowerCase())),
    )

    if (!filteredItems.length) {
      return <p className={styles.itemsNothing}>Ничего не найдено</p>
    }

    return filteredItems
      .sort((a, b) =>
        !isMultiple ? 0 : +value.includes(b.key) - +value.includes(a.key),
      )
      .map((item) => (
        <div
          className={classNames(styles.item, {
            [styles.active]: value.includes(item.key),
          })}
          key={item.key}
          onClick={() => toggleItem(item)}
        >
          {renderItem?.(item) ?? String(item.value)}
        </div>
      ))
  }, [items, isInputtable, query, value, renderItem, filterItem])

  const inputValue = useMemo(() => {
    if (query || isFocused) {
      return query
    } else if (!value.length) {
      return null
    } else if (value.length > 1) {
      return `Выбрано: ${value.length}`
    } else {
      const item = items.find((i) => i.key === value[0])

      if (!item) {
        return null
      } else if (
        typeof item.value === 'number' ||
        typeof item.value === 'string'
      ) {
        return item.value.toString()
      } else {
        return 'Выбрано'
      }
    }
  }, [query, isFocused, value, items])

  return (
    <ControlContainer
      className={className}
      label={label}
      postscript={postscript}
      error={error}
    >
      <WithPopover
        className={classNames(styles.withPopover, {
          [styles.inputtable]: isInputtable,
          [styles.error]: !!error,
        })}
        popoverClassName={styles.items}
        reference={
          <BaseInput
            className={styles.inputContainer}
            inputClassName={styles.input}
            ref={inputRef}
            onClick={onInputClick}
            error={!!error}
            placeholder={placeholder}
            blocked={!isInputtable}
            value={inputValue}
            onChange={setQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            postfix={
              <Sandwich
                items={[
                  {
                    key: 'false',
                    value: (
                      <BaseButton hoverable>
                        <Icon
                          className={styles.chevronIcon}
                          icon="chevronDown"
                        />
                      </BaseButton>
                    ),
                  },
                  {
                    key: 'true',
                    value: (
                      <BaseButton onClick={clear} stopPropagation hoverable>
                        <Icon icon="times" />
                      </BaseButton>
                    ),
                  },
                ]}
                activeKey={!isClearable ? 'false' : (!!value.length).toString()}
              />
            }
          />
        }
        popover={renderedItems}
        placement="bottom"
        isActive={isActive}
        setIsActive={setIsActive}
        noClick
      />
    </ControlContainer>
  )
}
