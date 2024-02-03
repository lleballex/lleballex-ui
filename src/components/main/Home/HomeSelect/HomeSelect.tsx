import Select from '@/components/ui/Select'
import Icon from '@/components/ui/Icon'
import styles from './HomeSelect.module.scss'

export default function HomeSelect() {
  return (
    <div className={styles.container}>
      <h2>Selects</h2>
      <div className={styles.selects}>
        <Select
          items={[
            { key: '1', value: '1' },
            { key: '2', value: '2' },
            { key: '3', value: '3' },
            { key: '4', value: '4' },
            { key: '5', value: '5' },
            { key: '6', value: '6' },
            { key: '7', value: '7' },
            { key: '8', value: '8' },
            { key: '9', value: '9' },
          ]}
        />
        <Select
          label="Clearable"
          postscript="Postscript"
          items={[
            { key: '1', value: '1' },
            { key: '2', value: '2' },
            { key: '3', value: '3' },
            { key: '4', value: '4' },
            { key: '5', value: '5' },
            { key: '6', value: '6' },
            { key: '7', value: '7' },
            { key: '8', value: '8' },
            { key: '9', value: '9' },
          ]}
          clearable
        />
        <Select
          label="Inputtable + clearable"
          postscript="Postscript"
          placeholder="Type something"
          items={[
            { key: '1', value: '1' },
            { key: '2', value: '2' },
            { key: '3', value: '3' },
            { key: '4', value: '4' },
            { key: '5', value: '5' },
            { key: '6', value: '6' },
            { key: '7', value: '7' },
            { key: '8', value: '8' },
            { key: '9', value: '9' },
          ]}
          inputtable
          clearable
        />
        <Select
          label="Multiple + inputtable + clearable"
          placeholder="Type something"
          error="Error"
          items={[
            { key: '1', value: '1' },
            { key: '2', value: '2' },
            { key: '3', value: '3' },
            { key: '4', value: '4' },
            { key: '5', value: '5' },
            { key: '6', value: '6' },
            { key: '7', value: '7' },
            { key: '8', value: '8' },
            { key: '9', value: '9' },
          ]}
          renderItem={(item) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon icon="times" />
              <span>{item.value}</span>
            </div>
          )}
          filterItem={(item, query) =>
            `times${item.value}`.includes(query.toLowerCase())
          }
          multiple
          clearable
          inputtable
        />
      </div>
    </div>
  )
}
