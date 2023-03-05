-- CreateTable
CREATE TABLE "Predio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tamanho" INTEGER NOT NULL,

    CONSTRAINT "Predio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "disponibilidade" BOOLEAN NOT NULL DEFAULT false,
    "locador" TEXT NOT NULL,
    "locatario" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "predioId" INTEGER NOT NULL,

    CONSTRAINT "Apartamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Apartamento" ADD CONSTRAINT "Apartamento_predioId_fkey" FOREIGN KEY ("predioId") REFERENCES "Predio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
