import { Header } from './components/layout/Header.tsx';
import { BondForm } from './components/form/BondForm.tsx';
import { YieldSummary } from './components/results/YieldSummary.tsx';
import { CashFlowTable } from './components/results/CashFlowTable.tsx';
import { Alert } from './components/ui/Alert.tsx';
import { useBondCalculator } from './hooks/useBondCalculator.ts';
import './index.css';

function App() {
  const { calculate, isLoading, errors, result } = useBondCalculator();

  return (
    <div className="app-container">
      <Header />

      <main className="main-grid">
        {/* Left Column: Form */}
        <div className="left-panel">
          <BondForm onSubmit={calculate} isLoading={isLoading} />
        </div>

        {/* Right Column: Results */}
        <div className="right-panel">
          <Alert errors={errors} />

          {result && (
            <div className="animate-fade-in">
              <YieldSummary result={result} />
              <CashFlowTable schedule={result.cashFlows} />
            </div>
          )}

          {!result && !isLoading && errors.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              Enter bond parameters and calculate yields to see results here.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
