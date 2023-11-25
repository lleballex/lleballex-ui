import { Key, ReactNode, useState } from 'react'
import classNames from 'classnames'
import Input from '@/components/ui/Input'
import WithPopover from '@/components/ui/WithPopover'
import Sandwich from '@/components/ui/Sandwich'
import Icon from '@/components/ui/Icon'
import styles from './Select.module.scss'

interface Item {
  key: Key
  value: ReactNode
}

interface Props {
  className?: string
  items?: Item[]
  renderItem?: (item: Item) => ReactNode
  filterItem?: (item: Item, query: string) => boolean
  mutliple?: boolean
  clearable?: boolean
  inputtable?: boolean
  label?: string
  placeholder?: string
  postscript?: string
  error?: string
}

export default function Select({
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
}: Props) {
  // TODO: value, onchange, react hook form

  const [isActive, setIsActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState<Key[]>([])
  const [query, setQuery] = useState<null | string>(null)

  const toggleItem = (item: Item) => {
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

  const clear = () => {
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
      className={classNames(styles.container, className)}
      inputContainerClassName={styles.inputContainer}
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
              value: <Icon className={styles.chevronIcon} icon="chevronDown" />,
            },
            {
              key: 'true',
              value: <Icon icon="times" onClick={clear} />,
            },
          ]}
          activeKey={(!!value.length).toString()}
        />
      }
      inputContainer={({ props, component }) => (
        <WithPopover
          className={styles.popoverContainer}
          referenceProps={{ ...props, onClick: () => setIsActive(true) }}
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
                {renderItem?.(item) ?? item.value}
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
