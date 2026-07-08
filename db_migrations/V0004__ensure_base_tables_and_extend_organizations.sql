CREATE TABLE IF NOT EXISTS t_p83639116_roor_kcros_lipetsk_s.documents (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    file_key VARCHAR(500) NOT NULL,
    size VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documents_category ON t_p83639116_roor_kcros_lipetsk_s.documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON t_p83639116_roor_kcros_lipetsk_s.documents(created_at DESC);

CREATE TABLE IF NOT EXISTS t_p83639116_roor_kcros_lipetsk_s.organizations (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    inn VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    registration_date DATE NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE t_p83639116_roor_kcros_lipetsk_s.organizations
    ADD COLUMN IF NOT EXISTS ogrn VARCHAR(20),
    ADD COLUMN IF NOT EXISTS kpp VARCHAR(20),
    ADD COLUMN IF NOT EXISTS representative VARCHAR(300),
    ADD COLUMN IF NOT EXISTS legal_address VARCHAR(500);
