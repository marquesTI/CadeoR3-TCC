CREATE DATABASE CadeOR3;
USE CadeOR3;

-- CRIANDO AS TABELAS
	CREATE TABLE TbEstado (
		Id INT PRIMARY KEY AUTO_INCREMENT,
        Nome CHAR(8) NOT NULL
	);
    
    CREATE TABLE TbCidade(
		Id INT PRIMARY KEY AUTO_INCREMENT,
        Nome VARCHAR(200) NOT NULL
    );
    
    CREATE TABLE TbEndereco(
		Cep CHAR(8) PRIMARY KEY,
        IdCid INT NOT NULL,
        IdUf INT NOT NULL,
        Logradouro VARCHAR(200) NOT NULL,
        FOREIGN KEY(IdCid) REFERENCES TbCidade(Id),
        FOREIGN KEY(IdUf) REFERENCES TbEstado(Id)
    );

	CREATE TABLE TbPerfis(
		Id INT PRIMARY KEY AUTO_INCREMENT,
        Nome VARCHAR(200)
    );
    
    CREATE TABLE TbLogin(
		Id INT PRIMARY KEY AUTO_INCREMENT,
        Login VARCHAR(200) NOT NULL,
        Senha VARCHAR(200) NOT NULL,
        Perfil INT NOT NULL,
        FOREIGN KEY (Perfil) REFERENCES TbPerfis(Id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    CREATE TABLE TbCliente(
		Id INT PRIMARY KEY AUTO_INCREMENT,
        Nome VARCHAR(200),
        Saldo DECIMAL(6,2) NOT NULL,
        Tel BIGINT NOT NULL,
        Email VARCHAR(200) NOT NULL,
        IdLogin INT NOT NULL,
        FOREIGN KEY (IdLogin) REFERENCES TbLogin(Id)
    );
    
    CREATE TABLE TbPf_Cli(
		Cpf BIGINT PRIMARY KEY,
        IdCli INT NOT NULL,
        Rg BIGINT NOT NULL,
        FOREIGN KEY(IdCli) REFERENCES TbCliente(Id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    CREATE TABLE TbPj_Cli(
		Cnpj BIGINT PRIMARY KEY,
        IdCli INT NOT NULL,
        IE BIGINT NOT NULL,
        FOREIGN KEY(IdCli) REFERENCES TbCliente(Id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    CREATE TABLE TbEndCli(
		Cep CHAR(8),
        IdCli INT,
        Num INT NOT NULL,
        FOREIGN KEY (IdCli) REFERENCES TbCliente(Id),
        FOREIGN KEY (Cep) REFERENCES TbEndereco(Cep)  ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY(Cep, IdCli)
    );

    CREATE TABLE TbFuncionario(
		Id INT PRIMARY KEY AUTO_INCREMENT,
        Nome VARCHAR(200) NOT NULL,
        Cargo VARCHAR(100) NOT NULL,
        DataAdmissao DATE NOT NULL,
        Tel BIGINT NOT NULL,
        VendasReg INT NOT NULL,
        IdLogin INT NOT NULL,
        FOREIGN KEY (IdLogin) REFERENCES TbLogin(Id)
    );
    
    CREATE TABLE TbCLT_Func(
		Cpf BIGINT PRIMARY KEY,
        Rg BIGINT NOT NULL,
        Cnh BIGINT,
        IdFunc INT NOT NULL,
        SalarioBruto DECIMAL(7,2) NOT NULL,
        VR DECIMAL(5,2),
        VA DECIMAL(5,2),
        VT DECIMAL(5,2),
        SalarioLiquido DECIMAL(7,2) NOT NULL,
        FOREIGN KEY (IdFunc) REFERENCES TbFuncionario(Id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE TbPj_Func(
		Cnpj BIGINT PRIMARY KEY,
        IE BIGINT NOT NULL,
        IdFunc INT NOT NULL,
        SalarioBruto DECIMAL(7,2) NOT NULL,
        FOREIGN KEY (IdFunc) REFERENCES TbFuncionario(Id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    CREATE TABLE TbEndFunc(
		Cep CHAR(8),
        IdFunc INT,
        Num INT NOT NULL,
        FOREIGN KEY (IdFunc) REFERENCES TbFuncionario(Id),
        FOREIGN KEY (Cep) REFERENCES TbEndereco(Cep) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY(Cep, IdFunc)
    );
    
    CREATE TABLE TbVendas(
		Nf INT PRIMARY KEY,
        IdCli INT NOT NULL,
        DataHora DATETIME NOT NULL,
        ValorTotal DECIMAL(6,2) NOT NULL,
        TipoPagamento ENUM ('Pix', 'Débito', 'Credito', 'Saldo') NOT NULL,
        FOREIGN KEY (IdCli) REFERENCES TbCliente(Id) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
    CREATE TABLE TbEstoque(
		CodBarras BIGINT PRIMARY KEY,
        Nome VARCHAR(200) NOT NULL,
        Qtd SMALLINT CHECK(Qtd >= 0) NOT NULL,
        Tipo ENUM('Jogo', 'Cosmetico') NOT NULL,
        Capa TEXT NOT NULL,
        Estilo VARCHAR(150) NOT NULL,
        Descricao VARCHAR(500) NOT NULL,
        Valor DECIMAL (6,2) NOT NULL
    );
    
    CREATE TABLE TbImagemSec(
		Url TEXT NOT NULL,
		CodBarras BIGINT,
		PRIMARY KEY(Url(100), CodBarras),
		FOREIGN KEY (CodBarras) REFERENCES TbEstoque(CodBarras) ON DELETE CASCADE ON UPDATE CASCADE
	);
    
    CREATE TABLE TbItemVenda(
		CodBarras BIGINT,
        Nf INT,
        Valor DECIMAL(6,2) NOT NULL,
        Qtd SMALLINT NOT NULL,
        PRIMARY KEY(CodBarras, Nf),
        FOREIGN KEY(CodBarras) REFERENCES TbEstoque(CodBarras) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY(Nf) REFERENCES TbVendas(Nf) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
-- PROCEDURES

	DELIMITER //
    CREATE PROCEDURE RegLogin (IN vLogin VARCHAR(200), IN vSenha VARCHAR(200), IN vPerfil INT)
    BEGIN
		IF NOT EXISTS(SELECT 1 FROM TbLogin WHERE Login = vLogin) THEN
			INSERT INTO TbLogin(Login, Senha, Perfil) VALUES(vLogin, vSenha, vPerfil);
		ELSE 
			SELECT 'Esse login já existe.' AS 'Mensagem';
		END IF;
    END //
    
    DELIMITER ;
    
	DELIMITER //
    CREATE PROCEDURE RegPerfil (IN vNome VARCHAR(200))
    BEGIN
		IF NOT EXISTS(SELECT 1 FROM TbPerfis WHERE Nome = vNome) THEN
			INSERT INTO TbPerfis(Nome) VALUES (vNome);
			SELECT 'Novo Perfil Registrado!' AS 'Mensagem';
		ELSE 
			SELECT 'Esse perfil já existe.' AS 'Mensagem';
		END IF;
    END //
    DELIMITER ;

	DELIMITER //
    
    CREATE PROCEDURE RegEndCli(IN vCep CHAR(8), IN vIdCli INT, IN vNum INT)
    BEGIN
		INSERT INTO TbEndCli(Cep, IdCli, Num) VALUES(vCep, vIdCli, vNum);
    END //
    
    DELIMITER ;
    
	DELIMITER //
	CREATE PROCEDURE RegEnd (IN vCep CHAR(8), IN Logradouro VARCHAR(200), IN vNomeUf CHAR(2), IN vNomeCid VARCHAR(200), IN Tipo ENUM('Cliente', 'Func'), IN vNum INT, IN vId INT)
	BEGIN
		DECLARE vIdUf INT DEFAULT 0;
		DECLARE vIdCid INT DEFAULT 0;

		-- Verificar se o CEP já existe na TbEndereco
		IF NOT EXISTS (SELECT 1 FROM TbEndereco WHERE Cep = LPAD(vCep, 8, '0')) THEN
			-- Verificar se o estado já existe na TbEstado
			IF EXISTS (SELECT 1 FROM TbEstado WHERE Nome = vNomeUf) THEN
				SELECT Id INTO vIdUf FROM TbEstado WHERE Nome = vNomeUf;
			ELSE
				INSERT INTO TbEstado (Nome) VALUES (vNomeUf);
				SELECT Id INTO vIdUf FROM TbEstado WHERE Nome = vNomeUf;
			END IF;

			-- Verificar se a cidade já existe na TbCidade
			IF EXISTS (SELECT 1 FROM TbCidade WHERE Nome = vNomeCid) THEN
				SELECT Id INTO vIdCid FROM TbCidade WHERE Nome = vNomeCid;
			ELSE
				INSERT INTO TbCidade (Nome) VALUES (vNomeCid);
				SELECT Id INTO vIdCid FROM TbCidade WHERE Nome = vNomeCid;
			END IF;

			-- Inserir o endereço na TbEndereco
			INSERT INTO TbEndereco (Cep, Logradouro, IdUf, IdCid) 
			VALUES (LPAD(vCep, 8, '0'), Logradouro, vIdUf, vIdCid);
		END IF;

		-- Associar o endereço ao cliente ou funcionário conforme o tipo
		IF Tipo = 'Cliente' THEN
			INSERT INTO TbEndCli (Cep, IdCli, Num) VALUES (LPAD(vCep, 8, '0'), vId, vNum);
		ELSEIF Tipo = 'Func' THEN
			INSERT INTO TbEndFunc (Cep, IdFunc, Num) VALUES (LPAD(vCep, 8, '0'), vId, vNum);
		END IF;
	END //
	
	DELIMITER ;
    
    DELIMITER //
    CREATE PROCEDURE RegCliPj(IN vCnpj BIGINT, IN vIdCli INT, IN vIE BIGINT)
    BEGIN
		IF NOT EXISTS(SELECT 1 FROM TbPj_Cli WHERE Cnpj = vCnpj) THEN
			IF NOT EXISTS(SELECT 1 FROM TbPj_Cli WHERE IdCli = vIdCli) THEN
				IF NOT EXISTS(SELECT 1 FROM TbPf_Cli WHERE IdCli = vIdCli) THEN
					IF NOT EXISTS(SELECT 1 FROM TbPj_Cli WHERE IE = vIE) THEN
						INSERT INTO TbPj_Cli (Cnpj, IdCli, IE) VALUES (vCnpj, vIdCli, vIE);
                    ELSE
						SELECT 'Esse IE já existe.' AS 'Mensagem';
					END IF;
                ELSE
					SELECT 'Esse cliente é PF' AS 'Mensagem';
				END IF;
            ELSE 
				SELECT 'Esse cliente já existe.' AS 'Mensagem';
			END IF;
        ELSE
			SELECT 'Esse CNPJ já existe.' AS 'Mensagem';
		END IF;
    END //
    
    DELIMITER ;
    
    DELIMITER //
    CREATE PROCEDURE RegCliPf(IN vCpf BIGINT, IN vIdCli INT, IN vRg BIGINT)
    BEGIN
		IF NOT EXISTS(SELECT 1 FROM TbPf_Cli WHERE Cpf = vCpf) THEN
				IF NOT EXISTS(SELECT 1 FROM TbPf_Cli WHERE Rg = vRg) THEN
					IF NOT EXISTS(SELECT 1 FROM TbPj_Cli WHERE IdCli = vIdCli) THEN
						IF NOT EXISTS(SELECT 1 FROM TbPf_Cli WHERE IdCli = vIdCli) THEN
							INSERT INTO TbPf_Cli (Cpf, IdCli, Rg) VALUES (vCpf, vIdCli, vRg);
						ELSE
							SELECT 'Esse cliente já existe.' AS 'Mensagem';
					END IF;
				ELSE
					SELECT 'Esse cliente é PJ.' AS 'Mensagem';
				END IF;
			ELSE
				SELECT 'Esse RG já existe.' AS 'Mensagem';
			END IF;
		ELSE
			SELECT 'Esse CPF já existe.' AS 'Mensagem';
		END IF;
    END //
    DELIMITER ;
    
    DELIMITER //
    CREATE PROCEDURE RegCli(IN vNome VARCHAR(200), IN vEmail VARCHAR(200), IN vLogin VARCHAR(200), IN vSenha VARCHAR(200), IN vTel BIGINT, IN vCpf BIGINT, IN vRg BIGINT, IN vCnpj BIGINT, IN vIE BIGINT, IN vCep CHAR(8), IN Logradouro VARCHAR(200), IN vNomeUf CHAR(2), IN vNomeCid VARCHAR(200), IN vNum INT)
    BEGIN
    DECLARE vIdCli INT;
    DECLARE vSaldo DECIMAL(6,2) DEFAULT 200.00;
    DECLARE vIdLogin INT;
    DECLARE vIdPerfil INT;

    -- Verificar se o perfil 'Cliente' existe, caso contrário, inseri-lo
    IF NOT EXISTS(SELECT 1 FROM TbPerfis WHERE Nome = 'Cliente') THEN
        INSERT INTO TbPerfis(Nome) VALUES('Cliente');
    END IF;
    SELECT Id INTO vIdPerfil FROM TbPerfis WHERE Nome = 'Cliente';

    -- Verificar se o login já existe
    IF NOT EXISTS(SELECT 1 FROM TbLogin WHERE Login = vLogin) THEN
        -- Verificar se o cliente já existe pelo nome
        IF NOT EXISTS(SELECT 1 FROM TbCliente WHERE Nome = vNome) THEN
            -- Verificar se o telefone já existe
            IF NOT EXISTS(SELECT 1 FROM TbCliente WHERE Tel = vTel) THEN
                -- Verificar se o email já existe
                IF NOT EXISTS(SELECT 1 FROM TbCliente WHERE Email = vEmail) THEN
                    -- Registrar login
                    CALL RegLogin(vLogin, vSenha, vIdPerfil);
                    SELECT Id INTO vIdLogin FROM TbLogin WHERE Login = vLogin;

                    -- Inserir cliente
                    INSERT INTO TbCliente (Nome, Email, Saldo, Tel, IdLogin)
                    VALUES (vNome, vEmail, vSaldo, vTel, vIdLogin);
                    SELECT Id INTO vIdCli FROM TbCliente WHERE Nome = vNome;

                    -- Registrar cliente PF ou PJ
                    IF vCpf IS NOT NULL THEN
                        CALL RegCliPf(vCpf, vIdCli, vRg);
                    ELSEIF vCnpj IS NOT NULL THEN
                        CALL RegCliPj(vCnpj, vIdCli, vIE);
                    END IF;

                    -- Verificar e registrar endereço
                    IF NOT EXISTS (SELECT 1 FROM TbEndereco WHERE Cep = LPAD(vCep, 8, '0')) THEN
                        CALL RegEnd(vCep, Logradouro, vNomeUf, vNomeCid, 'Cliente', vNum, vIdCli);
                    ELSE
                        -- Se o CEP já existe, apenas associar ao cliente
                        INSERT INTO TbEndCli (Cep, IdCli, Num) VALUES (LPAD(vCep, 8, '0'), vIdCli, vNum);
                    END IF;

                    -- Mensagem de sucesso
                    SELECT 'Cliente registrado!' AS Mensagem;
                ELSE
                    SELECT 'Esse Email já existe.' AS Mensagem;
                END IF;
            ELSE
                SELECT 'Esse Telefone já existe.' AS Mensagem;
            END IF;
        ELSE
            SELECT 'Esse Cliente já existe.' AS Mensagem;
        END IF;
    ELSE
        SELECT 'Esse Login já existe.' AS Mensagem;
    END IF;
END //

    
    DELIMITER ;
    
    DELIMITER // 
    CREATE PROCEDURE RegFuncClt(IN vCpf BIGINT, IN vRg BIGINT, IN vCnh BIGINT, IN vIdFunc INT, IN vSalario DECIMAL(7,2), IN vVA DECIMAL(5,2), IN vVT DECIMAL(5,2), IN vVR DECIMAL(5,2))
    BEGIN
		DECLARE vSalarioLiquido DECIMAL(7,2) DEFAULT 0;
		SET vSalarioLiquido = vSalario - vVA - vVt - vVr;
		INSERT INTO TbCLT_Func(Cpf, Rg, Cnh, IdFunc, SalarioBruto, VR, VA, VT, SalarioLiquido) VALUES (vCpf, vRg, vCnh, vIdFunc, vSalario, vVR, vVA, vVT, vSalarioLiquido);
	END //
    DELIMITER ;
    
    DELIMITER //
    CREATE PROCEDURE RegFuncPj(IN vCnpj BIGINT, IN vIe BIGINT, IN vIdFunc INT, IN vSalario DECIMAL(7,2))
    BEGIN
		INSERT INTO TbPj_Func(Cnpj, IE, IdFunc, SalarioBruto) VALUES(vCnpj, vIe, vIdFunc, vSalario);
    END//
    DELIMITER ;
    
    

	DELIMITER //

	CREATE PROCEDURE RegFuncionario (IN vNome VARCHAR(200),IN vLogin VARCHAR(200), IN vSenha VARCHAR(200), IN vPerfil VARCHAR(200), IN vCpf BIGINT, IN vRg BIGINT, IN vCnpj BIGINT, IN vIe BIGINT, IN vCnh BIGINT, IN vCargo VARCHAR(100), IN vTel BIGINT, IN vSalario DECIMAL(7,2), IN vVA DECIMAL(5,2), IN vVT DECIMAL(5,2), IN vVR DECIMAL(5,2), IN vCep CHAR(8), IN vLogradouro VARCHAR(50), IN Num INT, IN vNomeCid VARCHAR(200), IN vNomeUf CHAR(2))
	BEGIN
	-- Declarar variáveis locais
	DECLARE vIdFunc INT DEFAULT 0;
	DECLARE vIdLogin INT DEFAULT 0;
	DECLARE vIdPerfil INT DEFAULT 0;

	-- Verificar se o perfil existe na TbPerfis
	IF NOT EXISTS (SELECT 1 FROM TbPerfis WHERE Nome = vPerfil) THEN
		CALL RegPerfil(vPerfil);
	END IF;
	SELECT Id INTO vIdPerfil FROM TbPerfis WHERE Nome = vPerfil;

	-- Verificar se o login já existe na TbLogin
	IF NOT EXISTS (SELECT 1 FROM TbLogin WHERE Login = vLogin) THEN
		-- Registrar login
		CALL RegLogin(vLogin, vSenha, vIdPerfil);
		SELECT Id INTO vIdLogin FROM TbLogin WHERE Login = vLogin;

		-- Inserir funcionário
		INSERT INTO TbFuncionario (Nome, Tel, DataAdmissao, Cargo, VendasReg, IdLogin)
		VALUES (vNome, vTel, NOW(), vCargo, 0, vIdLogin);
		SELECT Id INTO vIdFunc FROM TbFuncionario WHERE Nome = vNome;

		-- Registrar funcionário CLT ou PJ
		IF vCpf IS NOT NULL THEN
			CALL RegFuncClt(vCpf, vRg, vCnh, vIdFunc, vSalario, vVA, vVT, vVR);
		ELSEIF vCnpj IS NOT NULL THEN
			CALL RegFuncPj(vCnpj, vIe, vIdFunc, vSalario);
		END IF;

		-- Verificar e registrar endereço
		IF NOT EXISTS (SELECT 1 FROM TbEndereco WHERE Cep = LPAD(vCep, 8, '0')) THEN
			CALL RegEnd(vCep, vLogradouro, vNomeUf, vNomeCid, 'Func', Num, vIdFunc);
		ELSE
			-- Se o CEP já existe, apenas associar ao funcionário
			INSERT INTO TbEndFunc (Cep, IdFunc, Num) VALUES (LPAD(vCep, 8, '0'), vIdFunc, Num);
		END IF;

		-- Mensagem de sucesso
		SELECT 'Funcionario registrado!' AS Mensagem;
	ELSE
		SELECT 'Esse Login já existe.' AS Mensagem;
	END IF;
	END //

	DELIMITER ;
    
    DELIMITER //
		CREATE PROCEDURE RegProduto(IN vCodBarras BIGINT, IN vNome VARCHAR(200), IN vQtd SMALLINT, IN vTipo ENUM('Jogo', 'Cosmetico'), IN vDescricao VARCHAR(500), IN vValor DECIMAL (6,2), IN vEstilo VARCHAR(150), IN vCapa TEXT)
        BEGIN
			IF NOT EXISTS(SELECT 1 FROM TbEstoque WHERE CodBarras = vCodBarras) THEN
				IF NOT EXISTS(SELECT 1 FROM TbEstoque WHERE Nome = vNome) THEN
					INSERT INTO TbEstoque(CodBarras, Nome, Qtd, Tipo, Capa, Estilo, Descricao, Valor) VALUES(vCodBarras, vNome, vQtd, vTipo, vCapa, vEstilo, vDescricao, vValor);
                    Select 'Produto registrado!' AS 'Mensagem';
				ELSE 
					Select 'Esse Produto já existe.' AS 'Mensagem';
				END IF;
			ELSE 
				Select 'Esse Codigo de Barras já existe.' AS 'Mensagem';
			END IF;
        END //
    DELIMITER ;
    
   DELIMITER //
	CREATE PROCEDURE AddImg(IN vNome VARCHAR(200), IN vUrl TEXT)
	BEGIN 
		DECLARE vCodBarras BIGINT;
		SELECT CodBarras INTO vCodBarras FROM TbEstoque WHERE Nome = vNome;
		IF vCodBarras IS NULL THEN
			SELECT 'Esse produto não existe.' AS 'Mensagem';
		ELSE 
			IF EXISTS(SELECT 1 FROM TbImagemSec WHERE Url = vUrl) THEN
				SELECT 'Essa imagem já existe.' AS 'Mensagem.';
			ELSE
				INSERT INTO TbImagemSec(CodBarras, Url) VALUES(vCodBarras, vUrl);
			END IF;
		END IF;
	END //
	DELIMITER ;
    
    DELIMITER //
	CREATE PROCEDURE AddSaldo(IN vId INT, IN vValor DECIMAL(6,2))
	BEGIN
		UPDATE TbCliente
		SET Saldo = Saldo + vValor
		WHERE Id = vId;
	END //
	DELIMITER ;
    
    DELIMITER //

	CREATE PROCEDURE AttValorNf(IN vNf INT, IN vValorTotal DECIMAL(6,2))
	BEGIN
		UPDATE TbVendas
		SET ValorTotal = ValorTotal + vValorTotal WHERE Nf = vNf;
	END //

	DELIMITER ;
    
    DELIMITER //
    CREATE PROCEDURE RegVenda(IN vNf INT, IN vNomeCli VARCHAR(200), IN vCodBarras BIGINT, IN vTipoPagamento ENUM('Pix','Débito','Credito','Saldo'), IN vQtdDesejada INT)
    BEGIN
		DECLARE QtdDisponivel INT;
		DECLARE vIdCli INT;
		DECLARE ValorUni DECIMAL (6,2);
		DECLARE vValorTotal DECIMAL (6,2);
		DECLARE vTipo ENUM('Jogo','Cosmetico');
		DECLARE vSaldo DECIMAL (6,2);

		IF vNomeCli IS NOT NULL THEN
			IF NOT EXISTS (SELECT 1 FROM TbCliente WHERE Nome = vNomeCli) THEN
				SELECT 'O cliente deve estar cadastrado para conseguir comprar algo.' AS 'Mensagem';
			ELSE
				SELECT Id INTO vIdCli FROM TbCliente WHERE Nome = vNomeCli;
				
				IF NOT EXISTS (SELECT 1 FROM TbEstoque WHERE CodBarras = vCodBarras) THEN
					SELECT 'Esse produto não existe.' AS 'Mensagem';
				ELSE
					SELECT Qtd INTO QtdDisponivel FROM TbEstoque WHERE CodBarras = vCodBarras;
					
					IF vQtdDesejada > QtdDisponivel THEN
						SELECT CONCAT('Estoque insuficiente, quantidade indisponivel! Produto em estoque: ', QtdDisponivel) AS 'Mensagem';
					ELSE
						SELECT Tipo INTO vTipo FROM TbEstoque WHERE CodBarras = vCodBarras;
						
						IF vTipo = 'Jogo' THEN
							SELECT Valor INTO ValorUni FROM TbJogos WHERE CodBarras = vCodBarras;
						ELSEIF vTipo = 'Cosmetico' THEN
							SELECT Valor INTO ValorUni FROM TbCosmeticos WHERE CodBarras = vCodBarras;
						END IF;
						
						SET vValorTotal = ValorUni * vQtdDesejada;
						
						IF vTipoPagamento = 'Saldo' THEN
							SELECT Saldo INTO vSaldo FROM TbCliente WHERE Id = vIdCli;
							
							IF vValorTotal > vSaldo THEN
								SELECT 'Saldo insuficiente.' AS 'Mensagem';
							ELSE
								UPDATE TbCliente
								SET Saldo = Saldo - vValorTotal
								WHERE Id = vIdCli;
								
								IF NOT EXISTS (SELECT 1 FROM TbVendas WHERE Nf = vNf) THEN
									INSERT INTO TbVendas(NF, ValorTotal, DataHora, IdCli, TipoPagamento)
									VALUES (vNf, vValorTotal, NOW(), vIdCli, vTipoPagamento);
								ELSE
									CALL AttValorNf(vNf, vValorTotal);
								END IF;
								
								INSERT INTO TbItemVenda(Nf, CodBarras, Valor, Qtd)
								VALUES (vNf, vCodBarras, ValorUni, vQtdDesejada);
								
								SELECT 'Venda registrada com sucesso.' AS 'Mensagem';
							END IF;
						ELSE
							IF NOT EXISTS (SELECT 1 FROM TbVendas WHERE Nf = vNf) THEN
								INSERT INTO TbVendas(NF, ValorTotal, DataHora, IdCli, TipoPagamento)
								VALUES (vNf, vValorTotal, NOW(), vIdCli, vTipoPagamento);
							ELSE
								UPDATE TbVendas
								SET ValorTotal = ValorTotal + vValorTotal
								WHERE Nf = vNf;
							END IF;
							
							INSERT INTO TbItemVenda(Nf, CodBarras, Valor, Qtd)
							VALUES (vNf, vCodBarras, ValorUni, vQtdDesejada);
							
							SELECT 'Venda registrada com sucesso.' AS 'Mensagem';
						END IF;
					END IF;
				END IF;
			END IF;
		END IF;
		END //
DELIMITER ;

-- TRIGGERS
	DELIMITER //
	CREATE TRIGGER Trg_AttEstoque AFTER INSERT ON TbItemVenda FOR EACH ROW
	BEGIN 
		DECLARE vQtd INT DEFAULT 0;
		SELECT Qtd INTO vQtd FROM TbItemVenda WHERE CodBarras = NEW.CodBarras AND Nf = NEW.Nf;
		UPDATE TbEstoque
		SET Qtd = Qtd - vQtd WHERE CodBarras = NEW.CodBarras;
	END //
	DELIMITER ;
    
-- INSERTS
	INSERT INTO TbPerfis(Nome) VALUES ('Adm');
	INSERT INTO TbPerfis(Nome) VALUES ('Fun');
	INSERT INTO TbPerfis(Nome) VALUES ('Cli');
	INSERT INTO TbLogin(Perfil, Login, Senha) VALUES (1, 'Admin', 'pontoevirgula');
	INSERT INTO TbLogin(Perfil, Login, Senha) VALUES (2, 'Funcionario', 'pontoevirgula');
	INSERT INTO TbLogin(Perfil, Login, Senha) VALUES (3, 'Cliente', 'pontoevirgula');
    
-- VIEWS
	CREATE VIEW vwEndereco AS
		SELECT Logradouro, Cidade.Nome AS Cidade, Estado.Nome AS Estado, Cep
        FROM TbEndereco 
        INNER JOIN TbCidade Cidade ON IdCid = Cidade.Id
        INNER JOIN TbEstado Estado ON IdUf = Estado.Id;
        
	CREATE VIEW vwEndCli AS
		SELECT Cliente.Nome AS Cliente, E.Logradouro AS Logradouro, Num, Cidade.Nome AS Cidade, Estado.Nome AS Estado, E.Cep
        FROM TbEndCli EC
        INNER JOIN TbEndereco E ON EC.Cep = E.Cep
		INNER JOIN TbCidade Cidade ON E.IdCid = Cidade.Id
        INNER JOIN TbEstado Estado ON E.IdUf = Estado.Id
        INNER JOIN TbCliente Cliente ON IdCli = Cliente.Id;
        
	CREATE VIEW vwEndFunc AS
		SELECT Funcionario.Nome AS Funcionario, E.Logradouro AS Logradouro, Num, Cidade.Nome AS Cidade, Estado.Nome AS Estado, E.Cep
        FROM TbEndFunc EF
        INNER JOIN TbEndereco E ON EF.Cep = E.Cep
		INNER JOIN TbCidade Cidade ON E.IdCid = Cidade.Id
        INNER JOIN TbEstado Estado ON E.IdUf = Estado.Id
        INNER JOIN TbFuncionario Funcionario ON IdFunc = Funcionario.Id;
        
	CREATE VIEW vwFuncionario AS
		SELECT Nome, Cargo, Tel AS 'Telefone', Login.Login AS 'Login'
        FROM TbFuncionario
        INNER JOIN TbLogin Login ON IdLogin = Login.Id;

	CREATE VIEW vwCliente AS
		SELECT Nome, Tel AS Telefone, Login.Login AS Login
        FROM TbCliente
		INNER JOIN TbLogin Login ON IdLogin = Login.Id;
        
	CREATE VIEW vwVendas AS
		SELECT DataHora AS `Data e Hora`, Nf AS `Nota Fiscal`, Cliente.Nome AS Cliente, TipoPagamento AS Pagamento, ValorTotal AS Valor
		FROM TbVendas
		INNER JOIN TbCliente Cliente ON IdCli = Cliente.Id;
    
    CREATE VIEW vwFuncionario_Adm AS
		SELECT Nome, Cargo, Tel AS 'Telefone', Login.Login AS 'Login', Login.Senha AS 'Senha', 
			COALESCE(
				(SELECT Cpf FROM TbClt_Func WHERE IdFunc = Funcionario.Id),
                (SELECT Cnpj FROM TbPj_Func WHERE IdFunc = Funcionario.Id)
            ) AS `CPF/CNPJ`,
            
            COALESCE(
				(SELECT Rg FROM TbClt_Func WHERE IdFunc = Funcionario.Id),
                (SELECT Ie FROM TbPj_Func WHERE IdFunc = Funcionario.Id)
            ) AS `RG/IE`,
            
            COALESCE(
				(SELECT Cnh FROM TbClt_Func WHERE IdFunc = Funcionario.Id),
                (SELECT '---- PJ ----')
            ) AS `CNH`,
            
            COALESCE(
				(SELECT SalarioLiquido FROM TbClt_Func WHERE IdFunc = Funcionario.Id),
                (SELECT SalarioBruto FROM TbPj_Func WHERE IdFunc = Funcionario.Id)
            ) AS Salario,
            
            COALESCE(
				(SELECT Vr FROM TbClt_Func WHERE IdFunc = Funcionario.Id),
                (SELECT '---- PJ ----')
            ) AS `Vale Refeição`,
            
            COALESCE(
				(SELECT Va FROM TbClt_Func WHERE IdFunc = Funcionario.Id),
                (SELECT '---- PJ ----')
                ) AS `Vale Alimentação`,
                
			COALESCE(
				(SELECT Vt FROM TbClt_Func WHERE IdFunc = Funcionario.Id),
                (SELECT '---- PJ ----')
            ) AS `Vale Transporte`,
            
            COALESCE(
				(CASE WHEN EXISTS(SELECT 1 FROM TbClt_Func WHERE IdFunc = Funcionario.Id) THEN '---- PF ----' END),
				(CASE WHEN EXISTS(SELECT 1 FROM TbPj_Func WHERE IdFunc = Funcionario.Id) THEN '---- PJ ----' END)
            ) AS Tipo
        FROM TbFuncionario Funcionario
        INNER JOIN TbLogin Login ON IdLogin = Login.Id
        LEFT JOIN TbClt_Func Clt ON Funcionario.Id = Clt.IdFunc
        LEFT JOIN TbPj_Func Pj ON Funcionario.Id = Pj.IdFunc;

	CREATE VIEW vwCliente_Adm AS
		SELECT Nome, Tel AS Telefone, Login.Login AS Login, Login.Senha AS Senha, Saldo,
			COALESCE(
				(SELECT Cpf FROM TbPf_Cli WHERE IdCli = Cliente.Id),
                (SELECT Cnpj FROM TbPj_Cli WHERE IdCli = Cliente.Id)
            ) AS `CPF/CNPJ`,
            
            COALESCE(
				(SELECT Rg FROM TbPf_Cli WHERE IdCli = Cliente.Id),
                (SELECT Ie FROM TbPj_Cli WHERE IdCli = Cliente.Id)
            ) AS `RG/IE`,
            
            COALESCE(
				(CASE WHEN EXISTS(SELECT 1 FROM TbPf_Cli WHERE IdCli = Cliente.Id) THEN '---- PF ----' END),
				(CASE WHEN EXISTS(SELECT 1 FROM TbPj_Cli WHERE IdCli = Cliente.Id) THEN '---- PJ ----' END)
            ) AS Tipo
        FROM TbCliente Cliente
		INNER JOIN TbLogin Login ON IdLogin = Login.Id
        LEFT JOIN TbPf_Cli Pf ON Cliente.Id = Pf.IdCli
        LEFT JOIN TbPj_Cli Pj ON Cliente.Id = Pj.IdCli;
        
