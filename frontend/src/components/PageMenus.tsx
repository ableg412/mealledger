import { useState } from 'react';

// CACFP meal types and the components served at each.
const MEAL_TYPES = [
  'BREAKFAST',
  'AM SNACK',
  'LUNCH',
  'PM SNACK',
  'SUPPER',
  'EVE SNACK',
] as const;

type MealType = (typeof MEAL_TYPES)[number];

const AGE_GROUPS = ['1-2 yrs', '3-5 yrs', '6-12 yrs', '13-18 yrs', 'ADULT'] as const;

// Portion options offered per cell — CACFP-realistic fractions.
const PORTIONS = ['—', '1/8', '1/4', '1/3', '1/2', '2/3', '3/4', '1', '1 1/2', '2'];

// Component rows shown in the Non-Infants table.
const COMPONENTS = [
  { id: 'milk',   label: 'MILK',  icon: '🥛', iconClass: 'cmp-milk',  unitDefault: 'CUP' },
  { id: 'veg',    label: 'VEG',   icon: '🥬', iconClass: 'cmp-veg',   unitDefault: 'CUP' },
  { id: 'fruit',  label: 'FRUIT', icon: '🍎', iconClass: 'cmp-fruit', unitDefault: 'CUP' },
  { id: 'grain',  label: 'GRAIN', icon: '🌾', iconClass: 'cmp-grain', unitDefault: 'OZ EQ' },
  { id: 'meat',   label: 'MEAT',  icon: '🍗', iconClass: 'cmp-meat',  unitDefault: 'OZ' },
] as const;

type ComponentId = (typeof COMPONENTS)[number]['id'];

interface ComponentEntry {
  item: string;
  unit: string;
  portions: Record<string, string>;  // age group → portion
}

interface MealRecord {
  status: 'Active' | 'Inactive';
  type: MealType;
  description: string;
  notes: string;
  compliant: boolean;
  ageGroup: 'Infants' | 'Non-Infants';
  components: Record<ComponentId, ComponentEntry>;
}

function emptyRecord(): MealRecord {
  return {
    status: 'Active',
    type: 'BREAKFAST',
    description: 'Bagels (WG)',
    notes: 'Whole-grain bagels with light cream cheese',
    compliant: true,
    ageGroup: 'Non-Infants',
    components: Object.fromEntries(
      COMPONENTS.map((c) => [
        c.id,
        {
          item: '',
          unit: c.unitDefault,
          portions: Object.fromEntries(AGE_GROUPS.map((a) => [a, '—'])),
        },
      ]),
    ) as Record<ComponentId, ComponentEntry>,
  };
}

export default function PageMenus() {
  const [record, setRecord] = useState<MealRecord>(() => emptyRecord());

  function updateRoot<K extends keyof MealRecord>(key: K, value: MealRecord[K]) {
    setRecord((r) => ({ ...r, [key]: value }));
  }

  function updateComponent(id: ComponentId, patch: Partial<ComponentEntry>) {
    setRecord((r) => ({
      ...r,
      components: {
        ...r.components,
        [id]: { ...r.components[id], ...patch },
      },
    }));
  }

  function updatePortion(id: ComponentId, age: string, value: string) {
    setRecord((r) => ({
      ...r,
      components: {
        ...r.components,
        [id]: {
          ...r.components[id],
          portions: { ...r.components[id].portions, [age]: value },
        },
      },
    }));
  }

  function handleClear() {
    if (confirm('Clear this menu? Unsaved changes will be lost.')) {
      setRecord(emptyRecord());
    }
  }

  return (
    <div className="mm">
      {/* Action toolbar — ChildWatch-style colored pills */}
      <div className="mm-toolbar">
        <button className="mm-action mm-save" type="button">
          <span className="mm-action-icon" aria-hidden="true">💾</span>
          <span>SAVE CHANGES</span>
        </button>
        <button className="mm-action mm-save-new" type="button">
          <span className="mm-action-icon" aria-hidden="true">➕</span>
          <span>SAVE AS NEW</span>
        </button>
        <button className="mm-action mm-delete" type="button">
          <span className="mm-action-icon" aria-hidden="true">🗑️</span>
          <span>DELETE</span>
        </button>
        <button className="mm-action mm-clear" type="button" onClick={handleClear}>
          <span className="mm-action-icon" aria-hidden="true">🧹</span>
          <span>CLEAR</span>
        </button>
        <button className="mm-action mm-help" type="button">
          <span className="mm-action-icon" aria-hidden="true">❓</span>
          <span>HELP</span>
        </button>
      </div>

      <div className="mm-title">
        <h1>MEAL MANAGER <span className="mm-records">(0 records)</span></h1>
      </div>

      {/* Status tabs */}
      <div className="mm-tabs">
        <span className={`mm-tab mm-tab-status ${record.status === 'Active' ? 'active' : ''}`}>
          ● {record.status.toUpperCase()}
        </span>
        <span className="mm-tab mm-tab-pill">BRK <small>(2)</small></span>
        <span className="mm-tab mm-tab-pill">SNACK <small>(3)</small></span>
        <span className="mm-tab mm-tab-pill">LUN/SUP <small>(3)</small></span>
      </div>

      <div className="mm-card">
        {/* Top fields */}
        <div className="mm-fields">
          <div className="mm-field">
            <label>STATUS</label>
            <select
              value={record.status}
              onChange={(e) => updateRoot('status', e.target.value as MealRecord['status'])}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="mm-field">
            <label>TYPE</label>
            <select
              value={record.type}
              onChange={(e) => updateRoot('type', e.target.value as MealType)}
            >
              {MEAL_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="mm-field mm-field-wide">
            <label>DESCRIPTION</label>
            <input
              type="text"
              value={record.description}
              onChange={(e) => updateRoot('description', e.target.value)}
            />
          </div>
          <div className="mm-field mm-field-wide">
            <label>NOTES</label>
            <input
              type="text"
              value={record.notes}
              onChange={(e) => updateRoot('notes', e.target.value)}
            />
          </div>
        </div>

        {/* Compliance toggle */}
        <div className="mm-row">
          <button
            className={`mm-toggle ${record.compliant ? 'on' : 'off'}`}
            onClick={() => updateRoot('compliant', !record.compliant)}
            type="button"
          >
            ● {record.compliant ? 'COMPLIANT' : 'UNUSED'}
          </button>
        </div>

        {/* Age group tabs */}
        <div className="mm-age-tabs">
          {(['Infants', 'Non-Infants'] as const).map((age) => (
            <button
              key={age}
              className={`mm-age-tab ${record.ageGroup === age ? 'active' : ''}`}
              onClick={() => updateRoot('ageGroup', age)}
              type="button"
            >
              {age}
            </button>
          ))}
        </div>

        {/* Components table */}
        <div className="mm-table-label">{record.type.split(' ')[0]}</div>
        <div className="mm-table-wrap">
          <table className="mm-table">
            <thead>
              <tr>
                <th className="mm-th-item">ITEM</th>
                <th className="mm-th-unit">UNIT</th>
                {AGE_GROUPS.map((a) => (
                  <th key={a} className="mm-th-age">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPONENTS.map((c) => {
                const entry = record.components[c.id];
                return (
                  <tr key={c.id}>
                    <td className="mm-td-item">
                      <span className={`mm-cmp-icon ${c.iconClass}`} aria-hidden="true">
                        {c.icon}
                      </span>
                      <span className="mm-cmp-label">{c.label}</span>
                      <input
                        type="text"
                        className="mm-cmp-input"
                        placeholder="select food…"
                        value={entry.item}
                        onChange={(e) => updateComponent(c.id, { item: e.target.value })}
                      />
                    </td>
                    <td className="mm-td-unit">
                      <span className={`mm-unit-pill mm-unit-${entry.unit.replace(/\s+/g, '-').toLowerCase()}`}>
                        {entry.unit}
                      </span>
                    </td>
                    {AGE_GROUPS.map((a) => (
                      <td key={a} className="mm-td-portion">
                        <select
                          value={entry.portions[a]}
                          onChange={(e) => updatePortion(c.id, a, e.target.value)}
                        >
                          {PORTIONS.map((p) => <option key={p}>{p}</option>)}
                        </select>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
