import { Key, MouseEventHandler, ReactNode, useState } from 'react'
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

interface Props<ItemValue> {
  className?: string
  items?: Item<ItemValue>[]
  renderItem?: (item: Item<ItemValue>) => ReactNode
  filterItem?: (item: Item<ItemValue>, query: string) => boolean
  mutliple?: boolean
  clearable?: boolean
  inputtable?: boolean
  label?: string
  placeholder?: string
  postscript?: string
  error?: string
}

export default function Select<ItemValue = any>({
  className,
  items = [],
  renderItem,
  filterItem,
  mutliple,
  clearable,
  inputtable,
  label,
  placeholder,
  postscript,
  error,
}: Props<ItemValue>) {
  // TODO: ref - for react hook form
  // TODO: disabled
  // TODO: value, onchange, react hook form, close on header click
  // TODO: add default placement

  const [isActive, setIsActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState<Key[]>([])
  const [query, setQuery] = useState<null | string>(null)

  const toggleItem = (item: Item<ItemValue>) => {
    if (mutliple) {
      const idx = value.indexOf(item.key)
      if (idx === -1) {
        setValue([...value, item.key])
      } else {
        setValue([...value.slice(0, idx), ...value.slice(idx + 1)])
      }
    } else {
      if (clearable && value.includes(item.key)) {
        setValue([])
      } else {
        setValue([item.key])
      }
      setIsActive(false)
    }
  }

  const clear: MouseEventHandler = (e) => {
    e.stopPropagation()
    setValue([])
    setQuery('')
    setIsActive(false)
  }

  const getInputValue = () => {
    if (!value.length) return null
    else if (value.length > 1) return `Выбрано: ${value.length}`
    else return value[0].toString()
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
              setIsActive(true)
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
              !mutliple ? 0 : +value.includes(b.key) - +value.includes(a.key),
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
