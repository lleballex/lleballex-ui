import Select from '@/components/ui/Select'

export default function HomeSelect() {
  return (
    <div>
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
        inputtable
        clearable
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
        label="Label"
        placeholder="Placeholder"
        postscript="Postscript"
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
        mutliple
        clearable
        inputtable
      />
    </div>
  )
}
