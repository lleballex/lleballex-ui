import { Key, MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import Input from '@/components/ui/Input'
import WithPopover from '@/components/ui/WithPopover'
import Sandwich from '@/components/ui/Sandwich'
import Icon from '@/components/ui/Icon'
import styles from './Select.module.scss'

interface Item<ItemValue> {
  key: Key
  value: ItemValue
}

interface Props<ItemValue, IsMultiple extends boolean> {
  className?: string
  items?: Item<ItemValue>[]
  renderItem?: (item: Item<ItemValue>) => ReactNode
  filterItem?: (item: Item<ItemValue>, query: string) => boolean
  multiple?: IsMultiple
  clearable?: boolean
  inputtable?: boolean
  label?: string
  placeholder?: string
  postscript?: string
  error?: string
  value?: IsMultiple extends true ? Key[] : Key
  onChange?: (val: IsMultiple extends true ? Key[] : Key) => void
}

export default function Select<
  ItemValue = any,
  IsMultiple extends boolean = false,
>({
  className,
  items = [],
  renderItem,
  filterItem,
  multiple,
  clearable,
  inputtable,
  label,
  placeholder,
  postscript,
  error,
  value: baseValue,
  onChange: baseOnChange,
}: Props<ItemValue, IsMultiple>) {
  // TODO: ref - for react hook form
  // TODO: disabled
  // TODO: add default placement

  const [value, setValue] = useState<Key[]>(
    Array.isArray(baseValue)
      ? baseValue
      : baseValue === undefined
        ? []
        : [baseValue],
  )

  useEffect(() => {
    if (baseValue !== undefined) {
      setValue(Array.isArray(baseValue) ? baseValue : [baseValue])
    }
  }, [baseValue])

  const onChange = (val: Key[]) => {
    if (baseOnChange || baseValue !== undefined) {
      // TODO: fix typescript
      //@ts-ignore
      baseOnChange?.(multiple ? val : val[0])
      if (baseValue === undefined) {
        setValue(val)
      }
    } else {
      setValue(val)
    }
  }

  const [isActive, setIsActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState<null | string>(null)

  useEffect(() => {
    if (!isActive && query) {
      setQuery(null)
    }
  }, [isActive])

  const toggleIsActive: MouseEventHandler = (e) => {
    if (!isActive) {
      setIsActive(true)
    } else if ((e.target as Element).tagName !== 'INPUT') {
      setIsActive(false)
    }
  }

  const toggleItem = (item: Item<ItemValue>) => {
    if (multiple) {
      const idx = value.indexOf(item.key)
      if (idx === -1) {
        onChange([...value, item.key])
      } else {
        onChange([...value.slice(0, idx), ...value.slice(idx + 1)])
      }
    } else {
      if (clearable && value.includes(item.key)) {
        onChange([])
      } else {
        onChange([item.key])
      }
      setIsActive(false)
    }
  }

  const clear: MouseEventHandler = (e) => {
    e.stopPropagation()
    onChange([])
    setIsActive(false)
  }

  const getInputValue = (): any => {
    if (!value.length) {
      return null
    } else if (value.length > 1) {
      return `Выбрано: ${value.length}`
    } else {
      const item = items.find((i) => i.key === value[0])
      // TODO: add renderInputValue
      return item ? item.value : null
    }
  }

  return (
    <Input
      className={classNames(styles.container, className, {
        [styles.inputtable]: inputtable,
        [styles.error]: !!error,
      })}
      inputContainerClassName={styles.inputContainer}
      inputClassName={styles.input}
      label={label}
      placeholder={placeholder}
      postscript={postscript}
      error={error}
      blocked={!inputtable}
      value={inputtable && (query || isFocused) ? query : getInputValue()}
      type="text"
      onChange={setQuery}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      postfix={
        <Sandwich
          items={[
            {
              key: 'false',
              value: (
                <Icon
                  className={styles.chevronIcon}
                  icon="chevronDown"
                  hoverable
                />
              ),
            },
            {
              key: 'true',
              value: <Icon icon="times" onClick={clear} hoverable />,
            },
          ]}
          activeKey={!clearable ? 'false' : (!!value.length).toString()}
        />
      }
      inputContainer={({ props, component }) => (
        <WithPopover
          className={styles.popoverContainer}
          referenceProps={{
            ...props,
            onClick: (e) => {
              toggleIsActive(e)
              props.onClick?.(e)
            },
          }}
          reference={component}
          popoverProps={{ className: styles.items }}
          popover={items
            .filter(
              (item) =>
                !inputtable ||
                query === null ||
                (filterItem?.(item, query) ??
                  item.value
                    ?.toString()
                    .toLowerCase()
                    .includes(query.toLowerCase())),
            )
            .sort((a, b) =>
              !multiple ? 0 : +value.includes(b.key) - +value.includes(a.key),
            )
            .map((item) => (
              <div
                className={classNames(styles.item, {
                  [styles.active]: value.includes(item.key),
                })}
                key={item.key}
                onClick={() => toggleItem(item)}
              >
                {/* TODO: fix typescript */}
                {renderItem?.(item) ?? (item.value as any)}
              </div>
            ))}
          isActive={isActive}
          setIsActive={setIsActive}
          noClick
        />
      )}
    />
  )
}
