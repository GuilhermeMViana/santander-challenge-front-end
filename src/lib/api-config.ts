// Configurações da API externa
export const API_CONFIG = {
  BASE_URL: process.env.EXTERNAL_API_URL || 'http://127.0.0.1:5001',
  ENDPOINTS: {
    TRANSACTIONS_OVERVIEW: '/transactions/overview',
    TRANSACTIONS_BAR_CHART: '/transactions/graphs/barChart',
    TRANSACTIONS_LIST: '/transactions/list',
    CNAE_PIE_CHART: '/cnae/graphs/pieChart',
    CNAE_LIST: '/cnae/list',
    MATURITY_OVERVIEW: '/maturity/overview',
    MATURITY_LIST: '/maturity/list',
  }
} as const;

// Configurações das API Routes locais (para os componentes)
export const INTERNAL_API_CONFIG = {
  BASE_URL: '',
  ENDPOINTS: {
    TRANSACTIONS_OVERVIEW: '/api/transactions/overview',
    TRANSACTIONS_BAR_CHART: '/api/transactions/bar-chart',
    TRANSACTIONS_LIST: '/api/transactions/list',
    CNAE_PIE_CHART: '/api/cnae/pie-chart',
    CNAE_LIST: '/api/cnae/list',
    MATURITY_OVERVIEW: '/api/maturity/overview',
    MATURITY_LIST: '/api/maturity/list',
  }
} as const;