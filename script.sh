#!/bin/bash
if [ ! -d "${PWD}/redis-data" ]; then mkdir -p "${PWD}/redis-data"; fi
if [ ! -d "${PWD}/postgres-data" ]; then mkdir -p "${PWD}/postgres-data"; fi