ALTER TABLE t_p83639116_roor_kcros_lipetsk_s.organizations
    ADD COLUMN IF NOT EXISTS is_member BOOLEAN DEFAULT TRUE;

UPDATE t_p83639116_roor_kcros_lipetsk_s.organizations
    SET is_member = FALSE, updated_at = CURRENT_TIMESTAMP
    WHERE inn IN ('4825144794', '4826084001', '4823016300');

UPDATE t_p83639116_roor_kcros_lipetsk_s.organizations
    SET name = 'Общество с ограниченной ответственностью Частное охранное предприятие «Воевода»',
        inn = '9721115621',
        status = 'Активно',
        category = 'Частная охрана',
        registration_date = '2026-07-22',
        ogrn = '1217700022011',
        kpp = '772101001',
        representative = 'Директор Кандоба Светлана Ивановна',
        legal_address = '109542, г. Москва, вн. тер. г. муниципальный округ Выхино-Жулебино, Рязанский проспект д. 86/1, стр. 3, пом. 3/3',
        is_member = TRUE,
        updated_at = CURRENT_TIMESTAMP
    WHERE inn = '4825144794';
