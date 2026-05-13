import { useState, useEffect, Fragment, ChangeEvent } from 'react';

// ─── H1530 structure ─────────────────────────────────────────────
// Mirrors the paper H1530 "Meal Production" section: 6 meals, each
// with their required components. Snacks are "2 of 5" rows where the
// component list shows all five options inline.

type MealKind = 'standard' | 'snack';

interface MealSection {
  meal: string;
  kind: MealKind;
  components: string[];
}

const SECTIONS: MealSection[] = [
  {
    meal: 'Breakfast',
    kind: 'standard',
    components: ['Fluid Milk', 'Fruit or Vegetable', 'Cereal and/or Grains'],
  },
  {
    meal: 'AM Snack',
    kind: 'snack',
    components: [
      '- Fluid Milk',
      '- Vegetable',
      '- Fruit',
      '- Grains',
      '- Meat and/or Alternate',
      '(2 of 5 must be served)',
    ],
  },
  {
    meal: 'Lunch',
    kind: 'standard',
    components: ['Fluid Milk', 'Vegetable', 'Fruit', 'Grains', 'Meat and/or Alternate'],
  },
  {
    meal: 'PM Snack',
    kind: 'snack',
    components: [
      '- Fluid Milk',
      '- Vegetable',
      '- Fruit',
      '- Grains',
      '- Meat and/or Alternate',
      '(2 of 5 must be served)',
    ],
  },
  {
    meal: 'Supper',
    kind: 'standard',
    components: ['Fluid Milk', 'Vegetables', 'Fruit', 'Grains', 'Meat and/or Alternate'],
  },
  {
    meal: 'Evening Snack',
    kind: 'snack',
    components: [
      '- Fluid Milk',
      '- Vegetable',
      '- Fruit',
      '- Grains',
      '- Meat and/or Alternate',
      '(2 of 5 must be served)',
    ],
  },
];

const DAY_COUNT = 5;
const STORAGE_KEY = 'mealledger.h1530.draft';

interface CellData {
  date: string;
  qty: string;
}

// rowKey = `${mealIndex}-${componentIndex}` (snacks use componentIndex 0 only)
interface FormData {
  signature: string;
  signatureDate: string;
  cells: Record<string, CellData[]>; // length DAY_COUNT
}

function emptyForm(): FormData {
  return {
    signature: '',
    signatureDate: '',
    cells: {},
  };
}

function rowKey(mealIndex: number, componentIndex: number): string {
  return `${mealIndex}-${componentIndex}`;
}

function ensureRow(form: FormData, key: string): CellData[] {
  if (!form.cells[key]) {
    form.cells[key] = Array.from({ length: DAY_COUNT }, () => ({ date: '', qty: '' }));
  }
  return form.cells[key];
}

function loadForm(): FormData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyForm();
    const parsed = JSON.parse(raw);
    return {
      signature: parsed.signature || '',
      signatureDate: parsed.signatureDate || '',
      cells: parsed.cells || {},
    };
  } catch {
    return emptyForm();
  }
}

function saveForm(form: FormData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
}

export default function MealProductionGrid() {
  const [form, setForm] = useState<FormData>(() => loadForm());

  // Auto-save every change to localStorage.
  useEffect(() => {
    saveForm(form);
  }, [form]);

  function updateCell(
    mealIndex: number,
    componentIndex: number,
    dayIndex: number,
    field: 'date' | 'qty',
    value: string,
  ) {
    setForm((prev) => {
      const next: FormData = {
        ...prev,
        cells: { ...prev.cells },
      };
      const key = rowKey(mealIndex, componentIndex);
      const row = ensureRow(next, key).map((c) => ({ ...c }));
      row[dayIndex] = { ...row[dayIndex], [field]: value };
      next.cells[key] = row;
      return next;
    });
  }

  function getCell(mealIndex: number, componentIndex: number, dayIndex: number): CellData {
    const row = form.cells[rowKey(mealIndex, componentIndex)];
    return row?.[dayIndex] || { date: '', qty: '' };
  }

  function handleClear() {
    if (confirm('Clear all entries? This cannot be undone.')) {
      setForm(emptyForm());
    }
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="h1530">
      <div className="h1530-toolbar no-print">
        <h2>Daily Meal Count, Attendance and Meal Production Record</h2>
        <div className="h1530-toolbar-actions">
          <button className="btn btn-ghost" onClick={handleClear}>
            Clear form
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>

      <table className="h1530-table-form">
        <thead>
          <tr>
            <th className="meal-col" rowSpan={2}>
              <div className="meal-production-title">Meal Production</div>
            </th>
            <th className="comp-col" rowSpan={2}></th>
            {Array.from({ length: DAY_COUNT }, (_, i) => (
              <th key={`day-${i}`} className="day-col" colSpan={2}>
                Day
              </th>
            ))}
          </tr>
          <tr>
            {Array.from({ length: DAY_COUNT }, (_, i) => (
              <Fragment key={`subhead-${i}`}>
                <th className="date-sub">Date</th>
                <th className="quan-sub">
                  Quan. <span className="dropdown-arrow">▼</span>
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {SECTIONS.map((section, mealIndex) => {
            if (section.kind === 'snack') {
              return (
                <tr key={section.meal} className="meal-row snack-row">
                  <td className="meal-label">
                    <span className="rotated">{section.meal}</span>
                  </td>
                  <td className="comp-label snack-comp">
                    {section.components.map((c) => (
                      <div key={c}>{c}</div>
                    ))}
                  </td>
                  {Array.from({ length: DAY_COUNT }, (_, dayIndex) => {
                    const cell = getCell(mealIndex, 0, dayIndex);
                    return (
                      <Fragment key={`snack-${mealIndex}-${dayIndex}`}>
                        <td className="date-cell">
                          <CellInput
                            value={cell.date}
                            onChange={(v) => updateCell(mealIndex, 0, dayIndex, 'date', v)}
                            placeholder="m/d"
                          />
                        </td>
                        <td className="quan-cell">
                          <CellInput
                            value={cell.qty}
                            onChange={(v) => updateCell(mealIndex, 0, dayIndex, 'qty', v)}
                            placeholder="qty"
                          />
                        </td>
                      </Fragment>
                    );
                  })}
                </tr>
              );
            }

            return section.components.map((comp, compIndex) => (
              <tr key={`${section.meal}-${comp}`} className="meal-row">
                {compIndex === 0 && (
                  <td className="meal-label" rowSpan={section.components.length}>
                    <span className="rotated">{section.meal}</span>
                  </td>
                )}
                <td className="comp-label">{comp}</td>
                {Array.from({ length: DAY_COUNT }, (_, dayIndex) => {
                  const cell = getCell(mealIndex, compIndex, dayIndex);
                  return (
                    <Fragment key={`${section.meal}-${comp}-${dayIndex}`}>
                      <td className="date-cell">
                        <CellInput
                          value={cell.date}
                          onChange={(v) => updateCell(mealIndex, compIndex, dayIndex, 'date', v)}
                          placeholder="m/d"
                        />
                      </td>
                      <td className="quan-cell">
                        <CellInput
                          value={cell.qty}
                          onChange={(v) => updateCell(mealIndex, compIndex, dayIndex, 'qty', v)}
                          placeholder="qty"
                        />
                      </td>
                    </Fragment>
                  );
                })}
              </tr>
            ));
          })}
        </tbody>
      </table>

      <div className="h1530-certification">
        <p>
          I certify that the information on this form is true and correct to the best of my
          knowledge and that I have followed the United States Department of Agriculture portion
          requirements and meal pattern guidelines. I further certify that I am only claiming for
          meals served to children enrolled in my day care home and that I only claim meals for my
          own children if they are eligible and an enrolled non-resident child is also being
          claimed. I understand that misrepresentation or withholding of information may result in
          prosecution under applicable state and federal statutes.
        </p>
        <div className="h1530-signature">
          <div className="sig-field">
            <input
              type="text"
              value={form.signature}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm((p) => ({ ...p, signature: e.target.value }))
              }
              placeholder="Sign here"
            />
            <label>Signature &mdash; Day Care Home Provider</label>
          </div>
          <div className="sig-field sig-date">
            <input
              type="text"
              value={form.signatureDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm((p) => ({ ...p, signatureDate: e.target.value }))
              }
              placeholder="m/d/yyyy"
            />
            <label>Date</label>
          </div>
        </div>
        <div className="h1530-footer">
          Daily Meal Count, Attendance and Meal Production Record, Page 2/10-2017
        </div>
      </div>
    </div>
  );
}

// Small wrapper so empty inputs collapse to one line and look like form cells.
interface CellInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function CellInput({ value, onChange, placeholder }: CellInputProps) {
  return (
    <input
      type="text"
      className="cell-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

